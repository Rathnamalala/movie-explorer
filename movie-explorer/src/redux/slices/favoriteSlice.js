import { createSlice } from '@reduxjs/toolkit';

// Initial state for favorites
const initialState = {
  movies: [], // Array of favorite movie objects
};

// Create the favorites slice with reducers
const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const movie = action.payload;
      // Prevent duplicates
      if (!state.movies.some(m => m.id === movie.id)) {
        state.movies.push(movie);
      }
    },
    removeFavorite: (state, action) => {
      const movieId = action.payload;
      state.movies = state.movies.filter(movie => movie.id !== movieId);
    },
    clearFavorites: (state) => {
      state.movies = [];
    },
  },
});

// Export actions and reducer
export const { addFavorite, removeFavorite, clearFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;

// Selectors
export const selectFavorites = (state) => state.favorites.movies;
export const selectIsFavorite = (state, movieId) => 
  state.favorites.movies.some(movie => movie.id === movieId);