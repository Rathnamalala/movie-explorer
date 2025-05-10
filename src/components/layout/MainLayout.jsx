import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { selectThemeMode } from '../../redux/slices/uiSlice';
import { getAppTheme } from '../../theme/theme';
import Header from '../common/Header';
import Footer from '../common/Footer';

const MainLayout = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const theme = getAppTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: themeMode === 'dark' ? '#000' : '#fff', // Black for dark mode, white for light mode
          color: themeMode === 'dark' ? '#fff' : '#000', // White text for dark mode, black text for light mode
        }}
      >
        {/* Header */}
        <Header />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: themeMode === 'dark' ? '#111' : '#f9f9f9', // Slightly lighter black for dark mode
            color: themeMode === 'dark' ? '#fff' : '#000',
            padding: { xs: 2, md: 4 }, // Responsive padding
            boxShadow: themeMode === 'dark'
              ? 'inset 0 0 10px rgba(255, 0, 0, 0.5)' // Subtle red glow for dark mode
              : 'none',
          }}
        >
          <Outlet />
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;
