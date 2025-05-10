import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, Pagination, Typography } from '@mui/material';
import HeroSection from '../components/common/HeroSection';
import SearchBar from '../components/movie/SearchBar';
import MovieGrid from '../components/movie/MovieGrid';
import Carousel from '../components/common/Carousel';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { 
  fetchFilteredMovies, 
  fetchTrendingMovies, 
  selectSearchResults, 
  selectTrendingMovies 
} from '../redux/slices/movieSlice';
import '../index.css'; // Import global styles

const HomePage = () => {
  const dispatch = useAppDispatch();

  // State for filters and pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Redux selectors
  const { data: trendingMovies, loading: trendingLoading } = useAppSelector(selectTrendingMovies);
  const { data: movies, totalPages, loading } = useAppSelector(selectSearchResults);

  // Fetch data on component mount and when filters/pagination change
  useEffect(() => {
    dispatch(fetchTrendingMovies());
    dispatch(fetchFilteredMovies({ page: currentPage, genre: selectedGenre, year: selectedYear }));
  }, [dispatch, currentPage, selectedGenre, selectedYear]);

  // Handlers
  const handlePageChange = (event, value) => setCurrentPage(value);

  const handleFilterReset = () => {
    setSelectedGenre('');
    setSelectedYear('');
    setCurrentPage(1);
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh' }}>
      {/* Hero Section */}
      <HeroSection />

      {/* Trending Movies Section */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
          Trending Movies
        </Typography>
        {trendingLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Carousel items={trendingMovies} />
        )}
      </Container>

      {/* Main Content Section */}
      <Container maxWidth="lg" sx={{ width: '100%', py: 4 }}>
        <Grid container spacing={4}>
          {/* Filter Section */}
          <Grid item xs={12} md={3}>
            <div className="filter-container">
              <Typography variant="h6" className="filter-title">
                Filters
              </Typography>

              {/* Genre Filter */}
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Genre
              </Typography>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="filter-select"
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
                className="filter-select"
              >
                <option value="">All Years</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select>

              {/* Reset Filters Button */}
              <button
                className="filter-reset-button"
                onClick={handleFilterReset}
              >
                Reset Filters
              </button>
            </div>
          </Grid>

          {/* Movies Section */}
          <Grid item xs={12} md={9}>
            <SearchBar />
            <MovieGrid 
              title="Movies"
              movies={movies}
              infiniteScroll={false}
              loading={loading}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination 
                count={totalPages} 
                page={currentPage} 
                onChange={handlePageChange} 
                color="primary" 
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
