import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, getCurrentUser } from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ocean View Resort</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">Welcome, {user?.username || 'User'}</span>
          <span className={`text-xs px-2 py-1 rounded font-semibold ${
            user?.role === 'ADMIN' 
              ? 'bg-yellow-500 text-black' 
              : 'bg-green-500 text-white'
          }`}>
            {user?.role || 'Unknown'}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
