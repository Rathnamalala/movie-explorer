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
          overflow: 'hidden'
        }}
      >
        <Header />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: '100%', 
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;
