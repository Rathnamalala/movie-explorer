// API Configuration for TMDB
const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3',
  apiKey: import.meta.env.VITE_TMDB_API_KEY,
  originalImage: (path) => `https://image.tmdb.org/t/p/original${path}`,
  w500Image: (path) => `https://image.tmdb.org/t/p/w500${path}`,
  w300Image: (path) => `https://image.tmdb.org/t/p/w300${path}`,
};

export default apiConfig;
