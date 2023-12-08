import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { Tooltip } from '@mui/material';


const MainListItems = () => {

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
  <React.Fragment>
    
    <ListItemButton component={Link} to="/Home">
      <Tooltip title="Dashboard" placement="right">
        <ListItemIcon>
        <DashboardIcon />
        </ListItemIcon>
      </Tooltip>
      <ListItemText primary={t('welcome.Dashboard')} />
    </ListItemButton>
    

    
    <ListItemButton component={Link} to="/Users">
      <Tooltip title="Users" placement="right">
        <ListItemIcon> 
        <PeopleIcon />
        </ListItemIcon>
      </Tooltip>
      <ListItemText primary={t('welcome.Users')}   />
      
    </ListItemButton>
    
    <ListItemButton component={Link} to="/Orders">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary={t('welcome.Orders')}  />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary={t('welcome.Reports')} />
    </ListItemButton>
    <ListItemButton component={Link} to="/AboutUs">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary={t('welcome.Integrations')} />
    </ListItemButton>
  </React.Fragment>
)};


export default MainListItems;