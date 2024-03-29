import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

import AlertMessages from './AlertMessages';

class HomeLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebar: false
    }
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.list = this.list.bind(this);
  }

  toggleDrawer(event, bar_state) {
    if(event.type === 'click') {
      this.setState({ sidebar: bar_state });
    } else {
      return;
    }
  }

  list() {
    return(
      <Box width='100' role='presentation'>
        <List>
          <ListItem key='Magic Packet'>
            <ListItemButton component={ Link } to='/'>
              <ListItemText primary='Magic Packet' />
            </ListItemButton>
          </ListItem>
          <ListItem key='Scan Devices'>
            <ListItemButton component={ Link } to='/scan'>
              <ListItemText primary='Scan Devices' />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    ); 
  }

  render() {
    return(
      <>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <IconButton onClick={(e) => this.toggleDrawer(e, true) } edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor='left' open={ this.state.sidebar } onClose={(e) => this.toggleDrawer(e, false) }>
              { this.list() }
            </Drawer>
            <Typography variant="h6" color="inherit" underline='none'>
              <Link href="/" underline="none" color="white">
                Magic Packet
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Grid container direction='row' justifyContent='flex-end' alignItems='flex-start'>
          <AlertMessages alerts={ this.props.alerts } deleteAlert={ this.props.deleteAlert }/>
        </Grid>
      </>
    );
  };
}

export default HomeLayout;
