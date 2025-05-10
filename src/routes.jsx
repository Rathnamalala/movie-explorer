import React from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../src/components/ProtectedRoute'; // Ensure this file exists
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import LoginPage from './pages/LoginPage';

// Routes configuration
const routes = (isAuthenticated) => [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/movie/:id',
        element: <MovieDetailPage />,
      },
      {
        path: '/favorites',
        element: (
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <FavoritesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
];

export default routes;
