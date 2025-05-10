import React from 'react';
import { Box, Typography, Container, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { selectTrendingMovies } from '../../redux/slices/movieSlice';
import apiConfig from '../../api/apiConfig';

const HeroSection = () => {
  const navigate = useNavigate();
  const { data: trendingMovies, loading } = useAppSelector(selectTrendingMovies);

  // Select a random trending movie for the hero background
  const randomIndex = trendingMovies?.length
    ? Math.floor(Math.random() * Math.min(5, trendingMovies.length))
    : 0;
  const featuredMovie = trendingMovies?.[randomIndex];

  const handleMovieClick = () => {
    if (featuredMovie) {
      navigate(`/movie/${featuredMovie.id}`);
    }
  };

  if (loading || !featuredMovie) {
    return (
      <Box
        sx={{
          height: { xs: '40vh', md: '60vh' },
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5" color="white">
          Loading featured movie...
        </Typography>
      </Box>
    );
  }

  const backgroundImage = featuredMovie.backdrop_path
    ? apiConfig.originalImage(featuredMovie.backdrop_path)
    : '';

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '70vh', md: '80vh' },
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9))',
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {/* Movie Title */}
            <Typography
              component="h1"
              variant="h2"
              color="#ff0000" // Red title
              gutterBottom
              sx={{
                fontWeight: 800,
                textShadow: '4px 4px 8px rgba(0,0,0,0.8)',
                letterSpacing: '0.1rem',
              }}
            >
              {featuredMovie.title}
            </Typography>

            {/* Movie Overview */}
            <Typography
              variant="h6"
              color="white"
              paragraph
              sx={{
                textShadow: '2px 2px 6px rgba(0,0,0,0.8)',
                mb: 4,
                maxWidth: '800px',
                lineHeight: 1.8,
              }}
            >
              {featuredMovie.overview?.length > 200
                ? `${featuredMovie.overview.substring(0, 200)}...`
                : featuredMovie.overview}
            </Typography>

            {/* Action Buttons */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleMovieClick}
                sx={{
                  backgroundColor: '#ff0000', // Red button
                  color: '#fff',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5,
                  borderRadius: '8px',
                  textTransform: 'none',
                  boxShadow: '0 4px 10px rgba(255, 0, 0, 0.5)',
                  '&:hover': {
                    backgroundColor: '#cc0000', // Darker red on hover
                    boxShadow: '0 6px 15px rgba(255, 0, 0, 0.7)',
                  },
                }}
              >
                View Details
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  color: '#fff',
                  borderColor: '#fff',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5,
                  borderRadius: '8px',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#ff0000',
                    color: '#ff0000',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                  },
                }}
              >
                Watch Trailer
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;