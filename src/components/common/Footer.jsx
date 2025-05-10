import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        width: '100%',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Movie Explorer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Discover your favorite films with our comprehensive movie database.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Home
            </Link>
            <Link href="/favorites" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Favorites
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              This product uses the TMDb API but is not endorsed or certified by TMDb.
            </Typography>
            <Box
              component="img"
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="TMDb logo"
              sx={{ width: 100 }}
            />
          </Grid>
        </Grid>
        <Box mt={2}>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
          >
            {'© '}
            {new Date().getFullYear()}{' '}
            <Link color="inherit" href="/">
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
