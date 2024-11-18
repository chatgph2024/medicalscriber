import { User, Mail, Phone, ChevronRight } from 'lucide-react';

export function AccountView() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Account</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Profile</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <label className="block text-sm text-gray-500">Email</label>
              <span className="text-sm">emil.apexsolution@gmail.com</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <label className="block text-sm text-gray-500">Specialty</label>
              <span className="text-sm">Addiction Medicine</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Need Support?</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500">Email Us</label>
            <a href="mailto:scribe-support@commure.com" className="text-sm text-blue-600">
              scribe-support@commure.com
            </a>
          </div>
          <div>
            <label className="block text-sm text-gray-500">Call Us</label>
            <a href="tel:415-680-9328" className="text-sm text-blue-600">
              415-680-9328
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <button className="w-full bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
          <span className="text-sm font-medium">Change Password</span>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </button>
        
        <button className="w-full bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
          <span className="text-sm font-medium">Upgrade to Pro</span>
          <div className="flex items-center">
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
              Scribe Core
            </span>
            <ChevronRight className="h-5 w-5 text-gray-400 ml-2" />
          </div>
        </button>
      </div>

      <button className="w-full py-3 text-sm text-gray-700 border border-gray-300 rounded-lg">
        Log Out
      </button>
    </div>
  );
}