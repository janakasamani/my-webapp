import React from 'react';
import { Typography, Container, Grid, Paper } from '@mui/material';
import './Home.css';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaidIcon from '@mui/icons-material/Paid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
const AboutUs = () => {
  return (
      <Box className='box-1'
            component="main" >
        <Container sx={{ mb: 4 }}>
          <Grid container sx={{ mb: 4 , mt: 4}} spacing={2} >
          <Grid item xs={12} md={6} lg={4}>
              <Paper className="paper2">
                <Grid container alignItems="center" spacing={4}>
                    <Grid item sx={{ ml: 2 }}>
                        <PeopleIcon/>
                    </Grid>
                    <Grid item  >
                        <Typography className="papertypo" variant="h6" >
                        Costumers
                        </Typography>
                        <Typography variant="h4" >
                        100
                        </Typography>
                    </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper className="paper2">
              <Grid container alignItems="center" spacing={4}>
                    <Grid item sx={{ ml: 2 }}>
                        <PaidIcon/>
                    </Grid>
                    <Grid item  >
                        <Typography className="papertypo" variant="h6" >
                        Transactions
                        </Typography>
                        <Typography variant="h4" >
                        100
                        </Typography>
                    </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper className="paper2">
              <Grid container alignItems="center" spacing={4}>
                    <Grid item sx={{ ml: 2 }}>
                    <ReceiptIcon/>
                    </Grid>
                    <Grid item  >
                        <Typography className="papertypo" variant="h6" >
                        Reports
                        </Typography>
                        <Typography variant="h4" >
                        100
                        </Typography>
                    </Grid>
                </Grid>
              </Paper>
            </Grid>  
            </Grid>
            <Grid container spacing={4} >
            <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
            </Container>
        </Box>

  );
};

export default AboutUs;


