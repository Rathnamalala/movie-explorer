import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  InputBase,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  AccountCircle,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectIsAuthenticated,
  selectUser,
  logout,
} from '../../redux/slices/authSlice';
import { toggleTheme, selectThemeMode } from '../../redux/slices/uiSlice';
import { searchMovies, clearSearchResults } from '../../redux/slices/movieSlice';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const themeMode = useAppSelector(selectThemeMode);
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Menu pages
  const pages = [
    { title: 'Home', path: '/' },
    { title: 'Favorites', path: '/favorites' },
  ];

  // User menu settings
  const settings = isAuthenticated ? ['Profile', 'Logout'] : ['Login'];

  // Handlers
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserMenuClick = (setting) => {
    setAnchorElUser(null);
    if (setting === 'Logout') {
      dispatch(logout());
      navigate('/login');
    } else if (setting === 'Login') {
      navigate('/login');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(clearSearchResults());
      dispatch(searchMovies({ query: searchQuery.trim(), page: 1 }));
      navigate('/');
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.header.background, // Dynamic background color
        color: theme.palette.header.text, // Dynamic text color
        boxShadow: 'none',
        borderBottom: `2px solid ${theme.palette.primary.main}`, // Red border
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for large screens */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              fontWeight: 700,
              letterSpacing: '0.1rem',
              color: theme.palette.primary.main,
              textDecoration: 'none',
              display: { xs: 'none', md: 'flex' }, // Hidden on small screens
            }}
          >
            MOVIE EXPLORER
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: theme.palette.primary.main }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }, // Visible only on small screens
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page.path);
                  }}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo for mobile */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              fontWeight: 700,
              letterSpacing: '0.1rem',
              color: theme.palette.primary.main,
              textDecoration: 'none',
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' }, // Hidden on large screens
            }}
          >
            MOVIE EXPLORER
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  color: theme.palette.header.text,
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            style={{
              position: 'relative',
              borderRadius: '4px',
              backgroundColor: 'rgba(255, 0, 0, 0.15)',
              marginRight: '16px',
              width: '100%',
              maxWidth: '300px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <SearchIcon
              style={{
                position: 'absolute',
                left: '8px',
                color: theme.palette.primary.main,
              }}
            />
            <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                color: 'inherit',
                padding: '8px 8px 8px 40px',
                width: '100%',
                fontSize: '0.9rem',
              }}
            />
          </form>

          {/* Theme toggle */}
          <IconButton
            onClick={() => dispatch(toggleTheme())}
            sx={{
              color: theme.palette.header.text,
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
          >
            {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {/* User menu */}
          <Box sx={{ ml: 2 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                {isAuthenticated && user ? (
                  <Avatar alt={user.name} src="/static/avatar.jpg" />
                ) : (
                  <AccountCircle sx={{ color: theme.palette.header.text }} />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleUserMenuClick(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;