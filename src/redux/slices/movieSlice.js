import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tmdbApi from '../../api/tmdbApi';

// Initial state
const initialState = {
  trending: {
    data: [],
    loading: false,
    error: null,
  },
  searchResults: {
    data: [],
    page: 1,
    totalPages: 0,
    loading: false,
    error: null,
  },
  movieDetails: {
    data: null,
    credits: null,
    videos: null,
    similar: [],
    loading: false,
    error: null,
  },
  favorites: [],
  lastSearchQuery: '',
  genres: [],
};

// Async thunks
export const fetchTrendingMovies = createAsyncThunk(
  'movies/fetchTrending',
  async (_, { rejectWithValue }) => {
    try {
      const response = await tmdbApi.getTrendingMovies();
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const searchMovies = createAsyncThunk(
  'movies/search',
  async ({ query, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await tmdbApi.searchMovies({ query, page });
      return {
        results: response.data.results,
        page: response.data.page,
        totalPages: response.data.total_pages,
        query,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchDetails',
  async (id, { rejectWithValue }) => {
    try {
      const detailsResponse = await tmdbApi.getMovieDetails(id);
      const creditsResponse = await tmdbApi.getMovieCredits(id);
      const videosResponse = await tmdbApi.getMovieVideos(id);
      const similarResponse = await tmdbApi.getSimilarMovies(id);

      return {
        details: detailsResponse.data,
        credits: creditsResponse.data,
        videos: videosResponse.data,
        similar: similarResponse.data.results,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchGenres = createAsyncThunk(
  'movies/fetchGenres',
  async (_, { rejectWithValue }) => {
    try {
      const response = await tmdbApi.getGenres();
      return response.data.genres;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchFilteredMovies = createAsyncThunk(
  'movies/fetchFiltered',
  async ({ genre, year, rating, page = 1 }, { rejectWithValue }) => {
    try {
      const params = {
        page,
        with_genres: genre,
        primary_release_year: year,
        'vote_average.gte': rating,
      };
      const response = await tmdbApi.discoverMovies(params);
      return {
        results: response.data.results,
        page: response.data.page,
        totalPages: response.data.total_pages,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      if (!state.favorites.find((movie) => movie.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (movie) => movie.id !== action.payload
      );
    },
    clearSearchResults: (state) => {
      state.searchResults.data = [];
      state.searchResults.page = 1;
      state.searchResults.totalPages = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Trending movies
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.trending.loading = true;
        state.trending.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.trending.data = action.payload;
        state.trending.loading = false;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.trending.loading = false;
        state.trending.error = action.payload;
      })
      // Search movies
      .addCase(searchMovies.pending, (state) => {
        state.searchResults.loading = true;
        state.searchResults.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        const { results, page, totalPages, query } = action.payload;
        // If it's a new search (page 1), replace results, otherwise append
        if (page === 1) {
          state.searchResults.data = results;
        } else {
          state.searchResults.data = [...state.searchResults.data, ...results];
        }
        state.searchResults.page = page;
        state.searchResults.totalPages = totalPages;
        state.lastSearchQuery = query;
        state.searchResults.loading = false;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.searchResults.loading = false;
        state.searchResults.error = action.payload;
      })
      // Movie details
      .addCase(fetchMovieDetails.pending, (state) => {
        state.movieDetails.loading = true;
        state.movieDetails.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.movieDetails.data = action.payload.details;
        state.movieDetails.credits = action.payload.credits;
        state.movieDetails.videos = action.payload.videos;
        state.movieDetails.similar = action.payload.similar;
        state.movieDetails.loading = false;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.movieDetails.loading = false;
        state.movieDetails.error = action.payload;
      })
      // Genres
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      })
      // Filtered movies
      .addCase(fetchFilteredMovies.pending, (state) => {
        state.searchResults.loading = true;
        state.searchResults.error = null;
      })
      .addCase(fetchFilteredMovies.fulfilled, (state, action) => {
        const { results, page, totalPages } = action.payload;
        // If it's a new search (page 1), replace results, otherwise append
        if (page === 1) {
          state.searchResults.data = results;
        } else {
          state.searchResults.data = [...state.searchResults.data, ...results];
        }
        state.searchResults.page = page;
        state.searchResults.totalPages = totalPages;
        state.searchResults.loading = false;
      })
      .addCase(fetchFilteredMovies.rejected, (state, action) => {
        state.searchResults.loading = false;
        state.searchResults.error = action.payload;
      });
  },
});

export const { addToFavorites, removeFromFavorites, clearSearchResults } =
  movieSlice.actions;

// Selectors
export const selectTrendingMovies = (state) => state.movies.trending;
export const selectSearchResults = (state) => state.movies.searchResults;
export const selectMovieDetails = (state) => state.movies.movieDetails;
export const selectFavorites = (state) => state.movies.favorites;
export const selectLastSearchQuery = (state) => state.movies.lastSearchQuery;
export const selectGenres = (state) => state.movies.genres;

export default movieSlice.reducer;