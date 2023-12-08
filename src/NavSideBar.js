import * as React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { useTranslation } from 'react-i18next';
import { styled, createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useState, useMemo } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MainListItems from './ListItems';
import ProfileMenu from './ProfileMenu';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import './NavSideBar.css'

const drawerWidth = 240;
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const themeRight = createTheme({
    direction: 'rtl', 
  });
  const themeLeft = createTheme ({
    direction: 'ltr'
  })
  const cacheLtr = createCache({ key: 'muiltr', stylisPlugins: [prefixer] });
  const cacheRtl = createCache({ key: 'muirtl', stylisPlugins: [prefixer, rtlPlugin] });
  
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


export default function NavSideBar() {
  
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const {t, i18n} = useTranslation("common");
  const [open, setOpen] = useState(true);
  const [themeMode, setThemeMode] = useState('light');
  const [themeLang, setThemeLang] = useState('ltr');
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');

  };
  const handleChange = (event) => {
    const selectedLang = event.target.value;
    setSelectedLanguage(selectedLang);
    localStorage.setItem("lang", selectedLang);
    if (selectedLang === 'Arabic') {
      i18n.changeLanguage('ar')
      setThemeLang('rtl');
    } else {
      i18n.changeLanguage('en')
      setThemeLang('ltr');
    }
  };
  console.log(themeLang)
  return (      
    <>
    <CacheProvider value={themeLang === 'rtl'?  cacheRtl : cacheLtr}>
      <ThemeProvider theme={themeLang === 'rtl'? themeRight : themeLeft }> 
      <Box className='boxflex' dir={themeLang === 'rtl' ? 'rtl' : 'ltr'}>
        <CssBaseline />
        <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
          <AppBar position="absolute" open={open} >
            <Toolbar className='Toolbar-class'//navbar 
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
              <MenuIcon />
              </IconButton>
                <Typography className='Typoflex'
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap //revents the text from breaking onto multiple lines
                >
                {t('welcome.Dashboard')} 
                </Typography>
                <InputLabel 
                id="demo-simple-select-label"
                >
                {t('welcome.Lang')} 
                </InputLabel>

                <Select /// languange part
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedLanguage}
                  label="Lang"
                  onChange={handleChange}
                >
                <MenuItem value={"English"}>EN</MenuItem>
                <MenuItem value={"Arabic"}>AR</MenuItem>

                </Select>
            
              <IconButton
                  color="inherit"
                  aria-label="toggle theme"
                  onClick={toggleTheme}
              >
              {themeMode === 'light' ? <LightModeIcon /> : <NightlightIcon />}
              </IconButton>
              <ProfileMenu/> 
            </Toolbar>
          </AppBar>
        
        <Drawer variant="permanent" open={open}>
          <Toolbar className='toolbar2'
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
          <MainListItems /> 
          </List>
        </Drawer>
        </ThemeProvider>
        <Outlet/>
        </Box>
      </ThemeProvider>
    </CacheProvider>
    </>
      );
    }