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
import '../../index.css'; // Import global styles
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
  const settings = isAuthenticated
    ? ['Profile', 'Account', 'Logout']
    : ['Login'];

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
    <AppBar position="static"
      sx={{
        backgroundColor: theme.palette.header.background, // Dynamic background color
        color: theme.palette.header.text, // Dynamic text color
        boxShadow: 'none',
        borderBottom: `2px solid ${theme.palette.primary.main}`, // Red border
      }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for large screens */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            className="header-logo"
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
              className="header-menu-button"
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
              className="mobile-menu"
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page.path);
                  }}
                  className="mobile-menu-item"
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
            className="header-logo"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
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
                className="button"
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="header-search">
            <div className="header-search-icon">
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="header-search-input"
            />
          </form>

          {/* Theme toggle */}
          <IconButton
            onClick={() => dispatch(toggleTheme())}
            className="header-theme-toggle"
          >
            {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {/* User menu */}
          <Box className="header-user-menu">
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} className="header-user-avatar">
                {isAuthenticated && user ? (
                  <Avatar alt={user.name} src="/static/avatar.jpg" />
                ) : (
                  <AccountCircle />
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
                  className="header-user-menu-item"
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