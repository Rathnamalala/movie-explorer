import React from 'react';
import { 
  Grid, 
  Box, 
  Typography, 
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import MovieCard from './MovieCard';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { 
  selectSearchResults, 
  searchMovies,
  selectLastSearchQuery
} from '../../redux/slices/movieSlice';

const MovieGrid = ({ title, movies, loading, error, infiniteScroll = false }) => {
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector(selectSearchResults);
  const lastSearchQuery = useAppSelector(selectLastSearchQuery);
  
  // Use our custom hook for infinite scrolling
  const fetchMoreMovies = () => {
    if (lastSearchQuery && searchResults.page < searchResults.totalPages) {
      dispatch(
        searchMovies({
          query: lastSearchQuery,
          page: searchResults.page + 1,
        })
      );
    }
  };
  
  const { lastElementRef, isFetching } = useInfiniteScroll(
    fetchMoreMovies,
    infiniteScroll && searchResults.page < searchResults.totalPages,
    searchResults.loading
  );
  
  // If we have a custom set of movies, use that, otherwise use search results
  const moviesToDisplay = movies || searchResults.data;
  const isLoading = loading || searchResults.loading;
  const hasError = error || searchResults.error;
  const hasMorePages = searchResults.page < searchResults.totalPages;
  
  if (isLoading && moviesToDisplay.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        py: 8 
      }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (hasError) {
    return (
      <Box sx={{ py: 2 }}>
        <Alert severity="error">
          {hasError}
        </Alert>
      </Box>
    );
  }
  
  if (moviesToDisplay.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        py: 8 
      }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          No movies found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Try searching for a different movie or check back later.
        </Typography>
      </Box>
    );
  }
  
  return (
    <Box sx={{ py: 4 }}>
      {title && (
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
          {title}
        </Typography>
      )}
      
      <Grid container spacing={3}>
        {moviesToDisplay.map((movie, index) => {
          // For infinite scroll, add ref to last element
          if (infiniteScroll && index === moviesToDisplay.length - 1) {
            return (
              <Grid 
                item 
                key={movie.id} 
                xs={12} sm={6} md={4} lg={3}
                ref={lastElementRef}
              >
                <MovieCard movie={movie} />
              </Grid>
            );
          }
          
          return (
            <Grid 
              item 
              key={movie.id} 
              xs={12} sm={6} md={4} lg={3}
            >
              <MovieCard movie={movie} />
            </Grid>
          );
        })}
      </Grid>
      
      {/* Show loading indicator when fetching more */}
      {(isLoading || isFetching) && moviesToDisplay.length > 0 && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 4 
        }}>
          <CircularProgress size={30} />
        </Box>
      )}
      
      {/* Show "Load More" button if not using infinite scroll */}
      {!infiniteScroll && hasMorePages && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 4 
        }}>
          
        </Box>
      )}
    </Box>
  );
};

export default MovieGrid;