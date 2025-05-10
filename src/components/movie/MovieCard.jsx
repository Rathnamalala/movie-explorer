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
        backgroundColor: '#000', // Black background
        color: '#fff', // White text
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 20px rgba(255, 0, 0, 0.5)', // Red glow on hover
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
          sx={{ 
            objectFit: 'cover',
            filter: 'brightness(0.8)', // Slight darkening for better text contrast
            transition: 'filter 0.3s ease',
            '&:hover': {
              filter: 'brightness(1)', // Brighten on hover
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            bgcolor: 'rgba(0, 0, 0, 0.7)', // Black background for badge
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
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 700,
              lineHeight: 1.2,
              mb: 1,
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
            sx={{ 
              color: '#ccc', // Light gray for secondary text
              mb: 1,
            }}
          >
            {releaseYear}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              color: '#ccc', // Light gray for secondary text
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
          bottom: 12,
          right: 12,
        }}
      >
        <IconButton
          onClick={handleFavoriteClick}
          color={isFavorite ? 'secondary' : 'default'}
          aria-label={isFavorite ? 'remove from favorites' : 'add to favorites'}
          size="small"
          sx={{
            bgcolor: isFavorite ? '#ff0000' : 'rgba(255, 255, 255, 0.8)', // Red for favorite, white for default
            color: isFavorite ? '#fff' : '#000', // White icon for favorite, black for default
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: isFavorite ? '#cc0000' : 'rgba(255, 255, 255, 0.9)', // Darker red or brighter white on hover
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