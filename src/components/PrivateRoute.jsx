import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, roles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading authentication state...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Genzura Role (admin cyangwa writer)
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />; // Niba adafite uburenganzira, myohereze kuri landing page
  }

  return children;
};

export default PrivateRoute;
