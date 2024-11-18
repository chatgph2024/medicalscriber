import { useState } from 'react';
import { Mic, StopCircle, Loader, AlertCircle } from 'lucide-react';
import { useRecording } from '../hooks/useRecording';

export function RecordingView() {
  const [patientName, setPatientName] = useState('');
  const [template, setTemplate] = useState('SOAP Note');
  const { isRecording, isProcessing, error, startRecording, stopRecording } = useRecording();

  const templates = [
    { id: 'soap', name: 'SOAP Note', description: 'Subjective, Objective, Assessment, Plan' },
    { id: 'hp', name: 'H&P Note', description: 'History and Physical Examination' },
    { id: 'progress', name: 'Progress Note', description: 'Documentation for Returning Patient' },
  ];

  const handleToggleRecording = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">New Recording</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-700">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Patient Name</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter Patient Name (Optional)"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={isRecording || isProcessing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Template</label>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={isRecording || isProcessing}
            >
              {templates.map((t) => (
                <option key={t.id} value={t.name}>{t.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleToggleRecording}
            disabled={isProcessing}
            className={`w-full py-3 px-4 rounded-md flex items-center justify-center space-x-2 ${
              isProcessing ? 'bg-gray-400 cursor-not-allowed' :
              isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {isProcessing ? (
              <>
                <Loader className="h-6 w-6 animate-spin" />
                <span>Processing...</span>
              </>
            ) : isRecording ? (
              <>
                <StopCircle className="h-6 w-6" />
                <span>Stop Recording</span>
              </>
            ) : (
              <>
                <Mic className="h-6 w-6" />
                <span>Start Recording</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}