import React from 'react';

class HomeLayout extends React.Component {

  render() {
    return(
      <>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
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
