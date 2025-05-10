import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { fetchMovieDetails } from '../redux/slices/movieSlice';
import MovieDetails from '../components/movie/MovieDetails';

const MovieDetailPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    // Fetch movie details when component mounts or ID changes
    if (id) {
      dispatch(fetchMovieDetails(id));
      // Scroll to top when loading a new movie
      window.scrollTo(0, 0);
    }
  }, [dispatch, id]);
  
  return <MovieDetails />;
};

export default MovieDetailPage;