import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';
import { useAppSelector } from '../redux/hooks';
import { selectIsAuthenticated } from '../redux/slices/authSlice';
import '../index.css'; // Import global styles

const LoginPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  // Redirect to home page if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#000', // Black background
        color: '#fff', // White text
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#ff0000', // Red title
            mb: 4,
          }}
        >
          Login to Movie Explorer
        </Typography>
        <LoginForm />
      </Container>
    </Box>
  );
};

export default LoginPage;