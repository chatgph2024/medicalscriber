import { Home, Mic, FileText, Settings, History } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();
  
  const links = [
    { icon: Mic, label: 'Record', path: '/record' },
    { icon: FileText, label: 'My Scribes', path: '/scribes' },
    { icon: Settings, label: 'AI Templates', path: '/templates' },
    { icon: History, label: 'History', path: '/history' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-between py-2">
          {links.map(({ icon: Icon, label, path }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center p-2 ${
                location.pathname === path ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}