const DEEPGRAM_API_KEY = '7888139b00ae1fec8789254d836c854f4d509b50';

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append('audio', audioBlob);

  const response = await fetch('https://api.deepgram.com/v1/listen?smart_format=true&detect_language=true&model=whisper-medium', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${DEEPGRAM_API_KEY}`,
    },
    body: formData
  });

  const data = await response.json();
  return data.results?.channels[0]?.alternatives[0]?.transcript || '';
}