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
      >
        {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;