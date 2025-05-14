
import { NavLink,useLocation  } from 'react-router-dom';
import Topbar from './Topbar';

export default function AuthShell({ children }) {

  
const location = useLocation();

const isTaskRoute =
  location.pathname.startsWith('/create') ||
  location.pathname.startsWith('/edit/');

  return (
    <div className="min-h-screen flex bg-gray-50">
      
      <aside className="w-64 bg-white border-r min-h-screen p-4">
        <h2 className="text-xl font-bold text-blue-600 mb-6">Menu</h2>
        <nav className="flex flex-col gap-3">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded font-medium ${
                isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            Dashboard
          </NavLink>
          
          <NavLink
            to="/dashboard"
            className={`block px-4 py-2 rounded font-medium ${
              isTaskRoute ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Tasks
          </NavLink>
        </nav>
      </aside>

      
      <div className="flex-1">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
