import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        width: '100%',
        backgroundColor: '#000', // Black background
        color: '#fff', // White text
        borderTop: '2px solid #ff0000', // Red top border
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: '#ff0000', // Red brand name
                mb: 2,
              }}
            >
              Movie Explorer
            </Typography>
            <Typography variant="body2" sx={{ color: '#ccc' }}>
              Discover your favorite films with our comprehensive movie database.
            </Typography>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: '#ff0000', // Red section title
                mb: 2,
              }}
            >
              Quick Links
            </Typography>
            <Link
              href="/"
              sx={{
                display: 'block',
                color: '#fff',
                mb: 1,
                textDecoration: 'none',
                '&:hover': { color: '#ff0000' }, // Red hover effect
              }}
            >
              Home
            </Link>
            <Link
              href="/favorites"
              sx={{
                display: 'block',
                color: '#fff',
                mb: 1,
                textDecoration: 'none',
                '&:hover': { color: '#ff0000' }, // Red hover effect
              }}
            >
              Favorites
            </Link>
          </Grid>

          {/* About Section */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: '#ff0000', // Red section title
                mb: 2,
              }}
            >
              About
            </Typography>
            <Typography variant="body2" sx={{ color: '#ccc', mb: 2 }}>
              This product uses the TMDb API but is not endorsed or certified by TMDb.
            </Typography>
            <Box
              component="img"
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="TMDb logo"
              sx={{
                width: 100,
                filter: 'brightness(0) invert(1)', // Invert logo for dark background
              }}
            />
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box mt={4} textAlign="center">
          <Typography
            variant="body2"
            sx={{
              color: '#ccc',
              '& a': {
                color: '#ff0000',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              },
            }}
          >
            {'© '}
            {new Date().getFullYear()}{' '}
            <Link href="/" sx={{ color: '#ff0000' }}>
              Movie Explorer
            </Link>
            {'. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
