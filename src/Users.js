import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Table from './Table';
import './Users.css';

export default function Users() {
  const {t, i18n} = useTranslation("common");
  useEffect(() => {
    const lang = localStorage.getItem('lang');
    if (lang === 'Arabic') {
      i18n.changeLanguage('ar')
    } else {
      i18n.changeLanguage('en')
    }
  }, [i18n]);

 return (
    <>
    <Box className='box-2'
          component="main"
        > 
      <Container sx={{ mb: 4 }}>
          <Grid item xs={12} md={12} lg={12}>
            <Table />
          </Grid>
      </Container>
    </Box>        
    </>
  );
}
