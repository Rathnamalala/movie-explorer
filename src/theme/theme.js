import { createTheme } from '@mui/material/styles';

export const getAppTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            background: {
              default: '#000',
              paper: '#111',
            },
            text: {
              primary: '#fff',
              secondary: '#ccc',
            },
            primary: {
              main: '#ff0000', // Red for primary actions
            },
            header: {
              background: '#000', // Black header for dark mode
              text: '#fff', // White text for dark mode
            },
          }
        : {
            background: {
              default: '#fff',
              paper: '#f9f9f9',
            },
            text: {
              primary: '#000',
              secondary: '#333',
            },
            primary: {
              main: '#ff0000', // Red for primary actions
            },
            header: {
              background: '#f9f9f9', // Light gray header for light mode
              text: '#000', // Black text for light mode
            },
          }),
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
  });