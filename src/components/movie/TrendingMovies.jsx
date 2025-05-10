import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { 
  fetchTrendingMovies,
  selectTrendingMovies
} from '../../redux/slices/movieSlice';
import MovieCard from './MovieCard';

const TrendingMovies = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: movies, loading, error } = useAppSelector(selectTrendingMovies);
  
  useEffect(() => {
    dispatch(fetchTrendingMovies());
  }, [dispatch]);
  
  return (
    <Box sx={{ py: 4 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3 
        }}
      >
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ fontWeight: 'bold' }}
        >
          Trending Movies
        </Typography>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/trending')}
        >
          View All
        </Button>
      </Box>
      
      {loading && movies.length === 0 ? (
        <Box 
          sx={{ 
            height: 400, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}
        >
          <Typography>Loading trending movies...</Typography>
        </Box>
      ) : error ? (
        <Box 
          sx={{ 
            height: 400, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}
        >
          <Typography color="error">
            Error loading trending movies: {error}
          </Typography>
        </Box>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            600: { slidesPerView: 2 },
            960: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          style={{ padding: '10px 5px 40px' }}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  );
};

export default TrendingMovies;