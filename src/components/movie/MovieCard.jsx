import React from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box, 
  IconButton,
  Tooltip,
  CardActionArea 
} from '@mui/material';
import { 
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Star as StarIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { 
  addToFavorites, 
  removeFromFavorites, 
  selectFavorites 
} from '../../redux/slices/movieSlice';
import apiConfig from '../../api/apiConfig';
import { getRatingColor, truncateText } from '../../utils/helpers';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  
  const isFavorite = favorites.some((fav) => fav.id === movie.id);
  
  const posterPath = movie.poster_path 
    ? apiConfig.w500Image(movie.poster_path)
    : '/static/no-poster.jpg';
    
  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };
  
  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : 'N/A';
    
  const rating = movie.vote_average || 0;
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          zIndex: 1,
        },
      }}
    >
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          height="300"
          image={posterPath}
          alt={movie.title}
          sx={{ objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            bgcolor: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '50%',
            p: 0.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Tooltip title={`${rating.toFixed(1)}/10`}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StarIcon sx={{ color: getRatingColor(rating), fontSize: 16 }} />
              <Typography variant="body2" sx={{ color: 'white', pl: 0.5 }}>
                {rating.toFixed(1)}
              </Typography>
            </Box>
          </Tooltip>
        </Box>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 600,
              lineHeight: 1.2,
              mb: 0.5,
              height: '2.4em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {movie.title}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mb: 1 }}
          >
            {releaseYear}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              height: '3em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {truncateText(movie.overview, 100)}
          </Typography>
        </CardContent>
      </CardActionArea>
      
      <Box 
        sx={{ 
          position: 'absolute',
          bottom: 8,
          right: 8,
        }}
      >
        <IconButton
          onClick={handleFavoriteClick}
          color={isFavorite ? 'secondary' : 'default'}
          aria-label={isFavorite ? 'remove from favorites' : 'add to favorites'}
          size="small"
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.9)',
            },
          }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>
    </Card>
  );
};

export default MovieCard;