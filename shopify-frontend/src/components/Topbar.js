import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const csrfToken = Cookies.get('XSRF-TOKEN');
      await axios.post('http://localhost:8000/api/logout', {}, {
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': csrfToken,
        },
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-blue-600">Task Manager</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium"
      >
        Logout
      </button>
    </header>
  );
}
