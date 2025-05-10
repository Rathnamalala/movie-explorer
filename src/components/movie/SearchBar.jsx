import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  InputAdornment, 
  IconButton, 
  Paper,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Typography,
  Collapse
} from '@mui/material';
import { 
  Search as SearchIcon,
  FilterList as FilterIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { 
  searchMovies, 
  clearSearchResults, 
  fetchFilteredMovies,
  selectGenres
} from '../../redux/slices/movieSlice';

// Generate years from 1900 to current year
const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1900; year--) {
    years.push(year);
  }
  return years;
};

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const genres = useAppSelector(selectGenres);
  const yearOptions = generateYearOptions();
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [ratingRange, setRatingRange] = useState([0, 10]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(clearSearchResults());
      dispatch(searchMovies({ query: searchQuery.trim(), page: 1 }));
    }
  };
  
  const handleFilter = (e) => {
    e.preventDefault();
    const filterParams = {
      genre: selectedGenre,
      year: selectedYear,
      rating: ratingRange[0],
      page: 1,
    };
    
    dispatch(clearSearchResults());
    dispatch(fetchFilteredMovies(filterParams));
  };
  
  const handleClearFilters = () => {
    setSelectedGenre('');
    setSelectedYear('');
    setRatingRange([0, 10]);
  };
  
  const handleRatingChange = (event, newValue) => {
    setRatingRange(newValue);
  };
  
  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      {/* Search form */}
      <form onSubmit={handleSearch}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={() => setShowFilters(!showFilters)}
                    color={showFilters ? 'primary' : 'default'}
                    edge="end"
                  >
                    {showFilters ? <CloseIcon /> : <FilterIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </Box>
      </form>
      
      {/* Filters */}
      <Collapse in={showFilters}>
        <form onSubmit={handleFilter}>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Genre</InputLabel>
                  <Select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    label="Genre"
                  >
                    <MenuItem value="">All Genres</MenuItem>
                    {genres.map((genre) => (
                      <MenuItem key={genre.id} value={genre.id}>
                        {genre.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Year</InputLabel>
                  <Select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    label="Year"
                  >
                    <MenuItem value="">All Years</MenuItem>
                    {yearOptions.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Box sx={{ px: 1, mt: 1 }}>
                  <Typography gutterBottom>
                    Rating: {ratingRange[0]} - {ratingRange[1]}
                  </Typography>
                  <Slider
                    value={ratingRange}
                    onChange={handleRatingChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={10}
                    step={0.5}
                  />
                </Box>
              </Grid>
            </Grid>
            
            <Box sx={{ 
              mt: 2, 
              display: 'flex', 
              justifyContent: 'flex-end',
              gap: 1 
            }}>
              <Button 
                variant="outlined" 
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
              <Button 
                variant="contained" 
                type="submit"
              >
                Apply Filters
              </Button>
            </Box>
          </Box>
        </form>
      </Collapse>
    </Paper>
  );
};

export default SearchBar;