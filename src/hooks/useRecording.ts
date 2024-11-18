import { useState, useRef } from 'react';
import { transcribeAudio } from '../lib/deepgram';
import { generateMedicalNote } from '../lib/together-ai';
import { db, storage, auth } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

export function useRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      setError('Error accessing microphone');
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = async () => {
    if (!mediaRecorder.current) return;

    return new Promise<void>((resolve) => {
      mediaRecorder.current!.onstop = async () => {
        try {
          setIsProcessing(true);
          setError(null);

          // Ensure user is authenticated
          if (!auth.currentUser) {
            throw new Error('User not authenticated');
          }

          const audioBlob = new Blob(audioChunks.current);
          const fileName = `recordings/${auth.currentUser.uid}/${Date.now()}.webm`;
          
          // Upload to Firebase Storage
          const storageRef = ref(storage, fileName);
          await uploadBytes(storageRef, audioBlob);
          const audioUrl = await getDownloadURL(storageRef);

          // Transcribe with Deepgram
          const transcript = await transcribeAudio(audioBlob);

          // Generate note with Together AI
          const note = await generateMedicalNote(transcript, 'SOAP');

          // Save to Firestore
          await addDoc(collection(db, 'scribes'), {
            userId: auth.currentUser.uid,
            audioUrl,
            transcript,
            note,
            createdAt: new Date().toISOString(),
          });

        } catch (error) {
          console.error('Error processing recording:', error);
          setError('Error processing recording. Please try again.');
        } finally {
          setIsProcessing(false);
          setIsRecording(false);
          resolve();
        }
      };

      mediaRecorder.current!.stop();
      mediaRecorder.current!.stream.getTracks().forEach(track => track.stop());
    });
  };

  return {
    isRecording,
    isProcessing,
    error,
    startRecording,
    stopRecording
  };
}