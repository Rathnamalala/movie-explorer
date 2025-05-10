import React from 'react';
import { useRoutes } from 'react-router-dom';
import { useAppSelector } from './redux/hooks';
import { selectIsAuthenticated } from './redux/slices/authSlice';
import routes from './routes';
import './index.css';

const App = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  // Generate routes based on authentication status
  const routing = useRoutes(routes(isAuthenticated));
  
  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      {routing}
    </div>
  );
};

export default App;
