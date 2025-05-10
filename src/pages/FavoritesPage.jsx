import React from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MovieGrid from '../components/movie/MovieGrid';
import { useAppSelector } from '../redux/hooks';
import { selectFavorites } from '../redux/slices/movieSlice';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const favorites = useAppSelector(selectFavorites);
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom
        sx={{ fontWeight: 'bold', mb: 3 }}
      >
        My Favorite Movies
      </Typography>
      
      {favorites.length === 0 ? (
        <Paper 
          elevation={1}
          sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            minHeight: '300px'
          }}
        >
          <Typography variant="h6" gutterBottom>
            You haven't added any favorite movies yet
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Explore movies and click the heart icon to add them to your favorites.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/')}
          >
            Explore Movies
          </Button>
        </Paper>
      ) : (
        <MovieGrid 
          movies={favorites}
          loading={false}
          error={null}
        />
      )}
    </Container>
  );
};

export default FavoritesPage;