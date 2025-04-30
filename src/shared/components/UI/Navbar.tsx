'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Box,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Navbar.module.scss';
import { useDispatch } from 'react-redux';
import { fetchGamesStartSpinner } from '@/src/store/gamesSlice';

const NAV_ITEMS = [
  { label: 'Главная', path: '/' },
  { label: 'Steam Deck', path: '/steamDeck' },
];

export const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    if (path === pathname) return;
    dispatch(fetchGamesStartSpinner());
    router.push(path);
    handleCloseMenu();
  };

  return (
    <AppBar position="sticky" color="default" className={styles['navbar']}>
      <Container>
        <header>
          <Toolbar disableGutters className={styles['navbar__toolbar']}>
            <Box
              className={styles['navbar__logo']}
              onClick={() => handleNavigate('/')}
            >
              <Typography
                variant="h6"
                className={`${styles['navbar__logo-text']} ${styles['navbar__logo-text--purple']}`}
              >
                Game
              </Typography>
              <Typography variant="h6" className={styles['navbar__logo-text']}>
                Portal
              </Typography>
            </Box>

            <nav className={styles['navbar__nav-items']}>
              {NAV_ITEMS.map(({ label, path }) => (
                <Button
                  key={label}
                  onClick={() => handleNavigate(path)}
                  sx={{
                    color: '#D1D5DB',
                    textTransform: 'none',
                    fontWeight: 500,
                    '&:hover': { color: '#fff' },
                  }}
                >
                  {label}
                </Button>
              ))}
            </nav>

            <Box className={styles['navbar__button-group']}>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ color: '#fff', borderColor: '#6B21A8' }}
              >
                Профиль
              </Button>
            </Box>

            <Box className={styles['navbar__menu-button']}>
              <IconButton size="large" onClick={handleOpenMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {NAV_ITEMS.map(({ label, path }) => (
                  <MenuItem key={label} onClick={() => handleNavigate(path)}>
                    <Typography textAlign="center">{label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </header>
      </Container>
    </AppBar>
  );
};
