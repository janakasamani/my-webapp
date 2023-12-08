import * as React from 'react';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { styled, createTheme, ThemeProvider} from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState, useMemo } from 'react';
import BarChart from './charts/Chart';
import PieChart from './charts/PieChart';
import './Home.css';

const themeRight = createTheme({
  direction: 'rtl', 
});
const themeLeft = createTheme ({
  direction: 'ltr',
})
const cacheLtr = createCache({ key: 'muiltr', stylisPlugins: [prefixer] });
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


export default function Home() {
  const [themeLang, setThemeLang] = useState('rtl');
  const {t, i18n} = useTranslation("common");

  useEffect(() => {
    const lang = localStorage.getItem('lang');
    if (lang === 'Arabic') {
      i18n.changeLanguage('ar');
      setThemeLang('rtl');
    } else {
      i18n.changeLanguage('en');
      setThemeLang('ltr');
    }
  }, [i18n]);


  return (      
    
  <CacheProvider value={themeLang === 'rtl'?  cacheRtl : cacheLtr}>
    <ThemeProvider theme={themeLang === 'rtl'? themeRight : themeLeft }>  
      <Box
        className='box-1'
        dir={themeLang === 'rtl' ? 'rtl' : 'ltr'}
        component="main"
          >
        <Container sx={{ mb: 4 }}>
          <Grid container sx={{ mb: 4 }} spacing={2}>
            
            <Grid item className='paper-column' xs={12} md={6} lg={3}>
              <Paper className="paper2">
                <Typography className="papertypo" variant="h6" align="center">
                  {t('chart.title1')}
                </Typography>
                <Typography variant="h4" align="center">
                  100
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Paper className="paper2">
                <Typography className="papertypo" variant="h6" align="center">
                  {t('chart.title2')}
                </Typography>
                <Typography variant="h4" align="center">
                  100
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Paper className="paper2">
                <Typography className="papertypo" variant="h6" align="center">
                  {t('chart.title1')}
                </Typography>
                <Typography variant="h4" align="center">
                  100
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Paper className="paper2">
                <Typography className="papertypo" variant="h6" align="center">
                  {t('chart.title1')}
                </Typography>
                <Typography variant="h4" align="center">
                  100
                </Typography>
              </Paper>
            </Grid>  
            </Grid>
            <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className="paper1">
                <BarChart />
              </Paper>
            </Grid> 
            <Grid item xs={12} md={6} lg={6}>
              <Paper className="paper1">
                <PieChart />
              </Paper>
            </Grid>
            
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  </CacheProvider>
);
}