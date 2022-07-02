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

class HomeLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebar: true
    }
  }

  toggleDrawer = () => {
    this.setState({ sidebar: !this.state.sidebar });
  }

  list = () => {
    return(
      <Box width='100' role='presentation' onClick={ this.toggleDrawer() } onKeyDown={ this.toggleDrawer() }>
        <List>
          <ListItem key='Magic Packet' disablePaddig>
            <ListItemButton>
              <ListItemText primary='Magic Packet' />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    ) 
  }

  render() {
    return(
      <>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton onClick={ this.toggleDrawer() } edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor='left' open={ this.state.sidebar } onClose={ this.toggleDrawer() }>
              { this.list() }
            </Drawer>
            <Typography variant="h6" color="inherit" component="div">
              Magic Packet
            </Typography>
          </Toolbar>
        </AppBar>
      </>
    );
  };
}

export default HomeLayout;
