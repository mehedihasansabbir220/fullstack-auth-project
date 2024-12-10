import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, adminOnly =false }) => {
    const { user, isAuthenticated } = useAuth();
  
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
  
    if (adminOnly && user?.role !== 'admin') {
      return <Navigate to="/unauthorized" replace />;
    }
  
    return <>{children}</>;
  };

  export default PrivateRoute