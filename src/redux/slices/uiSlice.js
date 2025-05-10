import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  themeMode: 'light', // 'light' or 'dark'
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    },
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now().toString(),
        ...action.payload,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const {
  toggleTheme,
  setThemeMode,
  addNotification,
  removeNotification,
} = uiSlice.actions;

// Selectors
export const selectThemeMode = (state) => state.ui.themeMode;
export const selectNotifications = (state) => state.ui.notifications;

export default uiSlice.reducer;