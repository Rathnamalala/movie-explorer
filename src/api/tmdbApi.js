import axios from 'axios';
import apiConfig from './apiConfig';

// Create axios instance with default config
const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  params: {
    api_key: apiConfig.apiKey,
  },
});

// Add response interceptor for error handling
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

const tmdbApi = {
  // Get trending movies
  getTrendingMovies: (params) => {
    return axiosClient.get('/trending/movie/week', { params });
  },

  // Search movies by keyword
  searchMovies: (params) => {
    return axiosClient.get('/search/movie', { params });
  },

  // Get movie details
  getMovieDetails: (id, params) => {
    return axiosClient.get(`/movie/${id}`, { params });
  },

  // Get movie cast
  getMovieCredits: (id, params) => {
    return axiosClient.get(`/movie/${id}/credits`, { params });
  },

  // Get movie videos (trailers)
  getMovieVideos: (id, params) => {
    return axiosClient.get(`/movie/${id}/videos`, { params });
  },

  // Get similar movies
  getSimilarMovies: (id, params) => {
    return axiosClient.get(`/movie/${id}/similar`, { params });
  },

  // Get movie genres list
  getGenres: (params) => {
    return axiosClient.get('/genre/movie/list', { params });
  },

  // Discover movies by filter
  discoverMovies: (params) => {
    return axiosClient.get('/discover/movie', { params });
  },
};

export default tmdbApi;