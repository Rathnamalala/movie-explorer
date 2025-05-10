import React from 'react';
import { Box, Typography, Container, Button, Grid, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { selectTrendingMovies } from '../../redux/slices/movieSlice';
import apiConfig from '../../api/apiConfig';

const HeroSection = () => {
  const theme = useTheme();
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
        height: { xs: '60vh', md: '70vh' },
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography
              component="h1"
              variant="h2"
              color="white"
              gutterBottom
              sx={{
                fontWeight: 700,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              {featuredMovie.title}
            </Typography>
            <Typography
              variant="h6"
              color="white"
              paragraph
              sx={{
                textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                mb: 4,
                maxWidth: '800px',
              }}
            >
              {featuredMovie.overview?.length > 200
                ? `${featuredMovie.overview.substring(0, 200)}...`
                : featuredMovie.overview}
            </Typography>
            <Box
              sx={{
                '& > *': {
                  mr: 2,
                  mb: 2
                },
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleMovieClick}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                View Details
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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