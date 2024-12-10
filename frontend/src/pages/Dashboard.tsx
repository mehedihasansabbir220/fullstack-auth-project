// frontend/src/pages/Dashboard.tsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="mb-4">
          <p className="text-lg"><strong>Username:</strong> {user?.username}</p>
          <p className="text-lg"><strong>Email:</strong> {user?.email}</p>
          <p className="text-lg"><strong>Role:</strong> {user?.role}</p>
        </div>
        <button 
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;