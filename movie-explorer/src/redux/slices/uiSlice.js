import { createSlice } from '@reduxjs/toolkit';

// Initial state for UI
const initialState = {
  darkMode: false,
  trailer: {
    isOpen: false,
    videoKey: null,
  },
  filters: {
    genre: '',
    year: '',
    rating: '',
  },
};

// Create the UI slice with reducers
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    openTrailer: (state, action) => {
      state.trailer.isOpen = true;
      state.trailer.videoKey = action.payload;
    },
    closeTrailer: (state) => {
      state.trailer.isOpen = false;
      state.trailer.videoKey = null;
    },
    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      state.filters[filterType] = value;
    },
    clearFilters: (state) => {
      state.filters = {
        genre: '',
        year: '',
        rating: '',
      };
    },
  },
});

// Export actions and reducer
export const {
  toggleDarkMode,
  openTrailer,
  closeTrailer,
  setFilter,
  clearFilters,
} = uiSlice.actions;

export default uiSlice.reducer;

// Selectors
export const selectDarkMode = (state) => state.ui.darkMode;
export const selectTrailer = (state) => state.ui.trailer;
export const selectFilters = (state) => state.ui.filters;