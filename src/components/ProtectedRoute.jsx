import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * A wrapper component that redirects to login page if user is not authenticated
 */
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
