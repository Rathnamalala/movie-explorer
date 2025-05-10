import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleTheme, selectThemeMode } from '../../redux/slices/uiSlice';

const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);

  return (
    <Tooltip title={`Turn ${themeMode === 'light' ? 'dark' : 'light'} mode on`}>
      <IconButton
        onClick={() => dispatch(toggleTheme())}
        color="inherit"
        aria-label="toggle dark/light mode"
        sx={{
          backgroundColor: themeMode === 'dark' ? '#ff0000' : '#000', // Red for dark mode, black for light mode
          color: '#fff', // White icon color
          transition: 'all 0.3s ease-in-out', // Smooth transition
          '&:hover': {
            backgroundColor: themeMode === 'dark' ? '#cc0000' : '#333', // Darker red or gray on hover
            transform: 'scale(1.1)', // Slight zoom effect on hover
          },
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', // Subtle shadow
        }}
      >
        {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;