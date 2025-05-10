import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Chip,
  Button,
  Divider,
  Paper,
  IconButton,
  CircularProgress,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Tooltip,
  Dialog,
  DialogContent,
  Container,
} from '@mui/material';
import {
  Star as StarIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  PlayArrow as PlayArrowIcon,
  Language as LanguageIcon,
  Schedule as ScheduleIcon,
  CalendarToday as CalendarIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  addToFavorites,
  removeFromFavorites,
  selectFavorites,
  selectMovieDetails,
} from '../../redux/slices/movieSlice';
import apiConfig from '../../api/apiConfig';
import {
  formatReleaseDate,
  formatRuntime,
  getYoutubeUrl,
  formatRating,
  getRatingColor,
} from '../../utils/helpers';
import MovieCard from './MovieCard';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`movie-tabpanel-${index}`}
      aria-labelledby={`movie-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const MovieDetails = () => {
  const dispatch = useAppDispatch();
  const { data: movie, credits, videos, similar, loading, error } = useAppSelector(
    selectMovieDetails
  );
  const favorites = useAppSelector(selectFavorites);

  const [activeTab, setActiveTab] = useState(0);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  if (loading || !movie) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '70vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography variant="h5" color="error" align="center">
          Error loading movie details: {error}
        </Typography>
      </Box>
    );
  }

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const backdropPath = movie.backdrop_path
    ? apiConfig.originalImage(movie.backdrop_path)
    : '';
  const posterPath = movie.poster_path
    ? apiConfig.w500Image(movie.poster_path)
    : '/static/no-poster.jpg';

  const trailer = videos?.results?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handlePlayTrailer = () => {
    if (trailer) {
      setSelectedTrailer(trailer);
      setTrailerOpen(true);
    }
  };

  const cast = credits?.cast?.slice(0, 10) || [];
  const director = credits?.crew?.find((person) => person.job === 'Director');

  return (
    <>
      {/* Backdrop Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '30vh', sm: '50vh', md: '70vh' },
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mb: 4,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: { xs: 2, sm: 4 },
            color: 'white',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    color: '#ff0000', // Red title
                    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  {movie.title}
                </Typography>

                {movie.tagline && (
                  <Typography
                    variant="h6"
                    sx={{
                      mt: 1,
                      mb: 2,
                      fontStyle: 'italic',
                      color: '#fff',
                    }}
                  >
                    {movie.tagline}
                  </Typography>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {movie.vote_average > 0 && (
                    <Tooltip title={`${movie.vote_count} votes`}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                        <StarIcon
                          sx={{
                            color: getRatingColor(movie.vote_average),
                            mr: 0.5,
                          }}
                        />
                        <Typography>{formatRating(movie.vote_average)}</Typography>
                      </Box>
                    </Tooltip>
                  )}

                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                    <CalendarIcon sx={{ fontSize: 'small', mr: 0.5 }} />
                    <Typography>{formatReleaseDate(movie.release_date)}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ScheduleIcon sx={{ fontSize: 'small', mr: 0.5 }} />
                    <Typography>{formatRuntime(movie.runtime)}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {movie.genres?.map((genre) => (
                    <Chip
                      key={genre.id}
                      label={genre.name}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(255, 0, 0, 0.2)', // Red tint
                        color: 'white',
                      }}
                    />
                  ))}
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  {trailer && (
                    <Button
                      variant="contained"
                      startIcon={<PlayArrowIcon />}
                      onClick={handlePlayTrailer}
                      sx={{
                        backgroundColor: '#ff0000',
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: '#cc0000',
                        },
                      }}
                    >
                      Watch Trailer
                    </Button>
                  )}

                  <Button
                    variant={isFavorite ? 'contained' : 'outlined'}
                    startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    onClick={handleFavoriteToggle}
                    sx={{
                      borderColor: isFavorite ? '#ff0000' : '#fff',
                      color: isFavorite ? '#fff' : '#fff',
                      '&:hover': {
                        borderColor: '#ff0000',
                        backgroundColor: isFavorite ? '#cc0000' : 'rgba(255, 0, 0, 0.1)',
                      },
                    }}
                  >
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>

      {/* Details Content */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid item xs={12} md={3}>
            <Paper elevation={2} sx={{ mb: 3 }}>
              <Box
                component="img"
                src={posterPath}
                alt={movie.title}
                sx={{ width: '100%', borderRadius: 1 }}
              />
            </Paper>

            <Paper sx={{ p: 2, mb: 3, backgroundColor: '#111', color: '#fff' }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Information
              </Typography>
              <Divider sx={{ mb: 2, borderColor: '#ff0000' }} />

              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Status
                </Typography>
                <Typography variant="body1">{movie.status}</Typography>
              </Box>

              {movie.budget > 0 && (
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Budget
                  </Typography>
                  <Typography variant="body1">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    }).format(movie.budget)}
                  </Typography>
                </Box>
              )}

              {movie.revenue > 0 && (
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Revenue
                  </Typography>
                  <Typography variant="body1">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    }).format(movie.revenue)}
                  </Typography>
                </Box>
              )}

              {movie.production_companies?.length > 0 && (
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Production
                  </Typography>
                  <Typography variant="body1">
                    {movie.production_companies
                      .map((company) => company.name)
                      .join(', ')}
                  </Typography>
                </Box>
              )}

              {movie.homepage && (
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<LanguageIcon />}
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                    sx={{
                      borderColor: '#ff0000',
                      color: '#ff0000',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                      },
                    }}
                  >
                    Official Website
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={9}>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: '#ff0000' }}>
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  aria-label="movie details tabs"
                  textColor="inherit"
                  indicatorColor="primary"
                >
                  <Tab label="Overview" />
                  <Tab label="Cast" />
                  {similar?.length > 0 && <Tab label="Similar Movies" />}
                </Tabs>
              </Box>

              {/* Overview Tab */}
              <TabPanel value={activeTab} index={0}>
                <Typography variant="h5" gutterBottom>
                  Overview
                </Typography>
                <Typography paragraph>{movie.overview}</Typography>

                {director && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Director
                    </Typography>
                    <Typography>{director.name}</Typography>
                  </Box>
                )}
              </TabPanel>

              {/* Cast Tab */}
              <TabPanel value={activeTab} index={1}>
                <Typography variant="h5" gutterBottom>
                  Cast
                </Typography>
                <List>
                  {cast.map((person) => (
                    <ListItem key={person.id} alignItems="center">
                      <ListItemAvatar>
                        <Avatar
                          alt={person.name}
                          src={
                            person.profile_path
                              ? apiConfig.w300Image(person.profile_path)
                              : '/static/no-avatar.jpg'
                          }
                          sx={{ width: 56, height: 56, mr: 2 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={person.name}
                        secondary={`as ${person.character || 'Unknown'}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </TabPanel>

              {/* Similar Movies Tab */}
              <TabPanel value={activeTab} index={2}>
                <Typography variant="h5" gutterBottom>
                  Similar Movies
                </Typography>
                <Grid container spacing={3}>
                  {similar?.map((movie) => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                      <MovieCard movie={movie} />
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Trailer Dialog */}
      <Dialog
        open={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={() => setTrailerOpen(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)',
              },
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>

          {selectedTrailer && (
            <Box
              sx={{
                position: 'relative',
                pb: '56.25%', // 16:9 aspect ratio
                height: 0,
                overflow: 'hidden',
              }}
            >
              <iframe
                width="100%"
                height="100%"
                src={getYoutubeUrl(selectedTrailer.key)}
                title={selectedTrailer.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MovieDetails;