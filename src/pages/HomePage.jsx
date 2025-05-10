import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, Pagination, Typography, Paper, Button } from '@mui/material';
import HeroSection from '../components/common/HeroSection';
import SearchBar from '../components/movie/SearchBar';
import MovieGrid from '../components/movie/MovieGrid';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { 
  fetchFilteredMovies, 
  fetchTrendingMovies, 
  selectSearchResults, 
  selectTrendingMovies 
} from '../redux/slices/movieSlice';
import Carousel from '../components/common/Carousel'; // Reusable Carousel component

const HomePage = () => {
  const dispatch = useAppDispatch();

  // Trending Movies
  const { data: trendingMovies, loading: trendingLoading } = useAppSelector(selectTrendingMovies);

  // Movies by Release Date
  const { data: movies, totalPages, loading } = useAppSelector(selectSearchResults);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    // Fetch trending movies on component mount
    dispatch(fetchTrendingMovies());

    // Fetch movies for the current page with filters
    dispatch(fetchFilteredMovies({ page: currentPage, genre: selectedGenre, year: selectedYear }));
  }, [dispatch, currentPage, selectedGenre, selectedYear]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleFilterReset = () => {
    setSelectedGenre('');
    setSelectedYear('');
    setCurrentPage(1);
  };

  return (
    <Box sx={{ width: '100%', backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      {/* Hero Section with featured movie */}
      <HeroSection />

      {/* Trending Movies Slider */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ mb: 2, fontWeight: 'bold', color: '#ff0000', transition: 'color 0.3s ease-in-out' }}
        >
          Trending Movies
        </Typography>
        {trendingLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Carousel items={trendingMovies} />
        )}
      </Container>

      {/* Main content with filters */}
      <Container maxWidth="lg" sx={{ width: '100%', py: 4 }}>
        <Grid container spacing={4}>
          {/* Filter Section */}
          <Grid item xs={12} md={3}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                backgroundColor: '#1a1a1a', 
                color: '#fff', 
                transition: 'transform 0.3s ease-in-out', 
                '&:hover': { transform: 'scale(1.05)' } 
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, color: '#ff0000' }}>
                Filters
              </Typography>

              {/* Genre Filter */}
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Genre
              </Typography>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginBottom: '16px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: '1px solid #ff0000',
                  borderRadius: '4px',
                  transition: 'border-color 0.3s ease-in-out',
                }}
              >
                <option value="">All Genres</option>
                <option value="28">Action</option>
                <option value="35">Comedy</option>
                <option value="18">Drama</option>
                <option value="27">Horror</option>
              </select>

              {/* Year Filter */}
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Year
              </Typography>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginBottom: '16px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: '1px solid #ff0000',
                  borderRadius: '4px',
                  transition: 'border-color 0.3s ease-in-out',
                }}
              >
                <option value="">All Years</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select>

              {/* Reset Filters Button */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#ff0000',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#cc0000' },
                  transition: 'background-color 0.3s ease-in-out',
                }}
                fullWidth
                onClick={handleFilterReset}
              >
                Reset Filters
              </Button>
            </Paper>
          </Grid>

          {/* Movies Section */}
          <Grid item xs={12} md={9}>
            <SearchBar />

            {/* Movie Grid */}
            <MovieGrid 
              title="Movies"
              movies={movies}
              infiniteScroll={false}
              loading={loading}
            />

            {/* Pagination Controls */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination 
                count={totalPages} 
                page={currentPage} 
                onChange={handlePageChange} 
                color="primary" 
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: '#fff',
                    '&.Mui-selected': {
                      backgroundColor: '#ff0000',
                      color: '#fff',
                    },
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
