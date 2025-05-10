import { createSlice } from '@reduxjs/toolkit';
import { fetchTrendingMovies, searchMovies, fetchMovieDetails } from '../thunks/movieThunks';

// Initial state for movies
const initialState = {
  trending: {
    movies: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 0,
  },
  search: {
    query: '',
    results: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 0,
  },
  movieDetails: {
    currentMovie: null,
    loading: false,
    error: null,
  },
  lastSearched: '',
  genres: [],
};

// Create the movie slice with reducers
const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setLastSearched: (state, action) => {
      state.lastSearched = action.payload;
    },
    resetSearch: (state) => {
      state.search = {
        query: '',
        results: [],
        loading: false,
        error: null,
        page: 1,
        totalPages: 0,
      };
    },
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle trending movies actions
    builder
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.trending.loading = true;
        state.trending.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        const { results, page, total_pages } = action.payload;
        state.trending.loading = false;
        
        // If it's the first page, replace the movies array
        // Otherwise, append the new movies
        if (page === 1) {
          state.trending.movies = results;
        } else {
          state.trending.movies = [...state.trending.movies, ...results];
        }
        
        state.trending.page = page;
        state.trending.totalPages = total_pages;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.trending.loading = false;
        state.trending.error = action.payload || 'Failed to fetch trending movies';
      })
      
      // Handle search movies actions
      .addCase(searchMovies.pending, (state) => {
        state.search.loading = true;
        state.search.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        const { results, page, total_pages, query } = action.payload;
        state.search.loading = false;
        
        // If it's the first page or a new query, replace the results array
        // Otherwise, append the new results
        if (page === 1 || query !== state.search.query) {
          state.search.results = results;
          state.search.query = query;
        } else {
          state.search.results = [...state.search.results, ...results];
        }
        
        state.search.page = page;
        state.search.totalPages = total_pages;
        state.lastSearched = query;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.search.loading = false;
        state.search.error = action.payload || 'Failed to search movies';
      })
      
      // Handle movie details actions
      .addCase(fetchMovieDetails.pending, (state) => {
        state.movieDetails.loading = true;
        state.movieDetails.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.movieDetails.loading = false;
        state.movieDetails.currentMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.movieDetails.loading = false;
        state.movieDetails.error = action.payload || 'Failed to fetch movie details';
      });
  },
});

// Export actions and reducer
export const { setLastSearched, resetSearch, setGenres } = movieSlice.actions;

export default movieSlice.reducer;

// Selectors
export const selectTrendingMovies = (state) => state.movies.trending.movies;
export const selectTrendingLoading = (state) => state.movies.trending.loading;
export const selectTrendingError = (state) => state.movies.trending.error;
export const selectTrendingPage = (state) => state.movies.trending.page;
export const selectTrendingTotalPages = (state) => state.movies.trending.totalPages;

export const selectSearchResults = (state) => state.movies.search.results;
export const selectSearchLoading = (state) => state.movies.search.loading;
export const selectSearchError = (state) => state.movies.search.error;
export const selectSearchPage = (state) => state.movies.search.page;
export const selectSearchTotalPages = (state) => state.movies.search.totalPages;
export const selectSearchQuery = (state) => state.movies.search.query;

export const selectCurrentMovie = (state) => state.movies.movieDetails.currentMovie;
export const selectMovieDetailsLoading = (state) => state.movies.movieDetails.loading;
export const selectMovieDetailsError = (state) => state.movies.movieDetails.error;

export const selectLastSearched = (state) => state.movies.lastSearched;
export const selectGenres = (state) => state.movies.genres;