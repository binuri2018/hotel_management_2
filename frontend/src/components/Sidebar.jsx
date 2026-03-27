import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';

const Sidebar = () => {
  const location = useLocation();
  const user = getCurrentUser();
  const isAdmin = user?.role === 'ADMIN';

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/rooms', label: 'Rooms', icon: '🛏️' },
    { path: '/customers', label: 'Customers', icon: '👥' },
    { path: '/bookings', label: 'Bookings', icon: '📅' },
  ];

  // Staff Management is visible only to admins
  if (isAdmin) {
    menuItems.push({ path: '/staff', label: 'Staff Management', icon: '👤' });
  }

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-2">
        {isAdmin ? 'Admin Panel' : 'Staff Panel'}
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        {user?.username || 'User'} • {user?.role || 'Unknown'}
      </p>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded transition ${
                location.pathname.startsWith(item.path)
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-700'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
