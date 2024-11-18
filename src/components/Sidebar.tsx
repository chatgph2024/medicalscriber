import { Link, useLocation } from 'react-router-dom';
import { Mic, FileText, Settings, User, Menu, ChevronLeft } from 'lucide-react';

export function Sidebar() {
  const location = useLocation();
  
  const links = [
    { icon: Mic, label: 'Record', path: '/record', color: 'text-blue-600' },
    { icon: FileText, label: 'My Scribes', path: '/scribes' },
    { icon: Settings, label: 'AI Templates', path: '/templates' },
    { icon: User, label: 'Account', path: '/account' },
  ];

  return (
    <div className="fixed left-0 top-0 w-64 h-full bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center">
        <Menu className="h-5 w-5 text-gray-500" />
        <span className="ml-2 text-sm text-gray-500">Collapse</span>
        <ChevronLeft className="h-5 w-5 ml-auto text-gray-500" />
      </div>
      
      <nav className="p-4">
        {links.map(({ icon: Icon, label, path, color }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center px-4 py-3 rounded-lg mb-1 ${
              location.pathname === path 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Icon className={`h-5 w-5 ${color || ''}`} />
            <span className="ml-3 text-sm font-medium">{label}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <Link to="/sign-out" className="flex items-center px-4 py-2 text-gray-700">
          <span className="text-sm">Sign Out</span>
        </Link>
        <Link to="/support" className="flex items-center px-4 py-2 text-gray-700">
          <span className="text-sm">Support</span>
        </Link>
      </div>
    </div>
  );
}