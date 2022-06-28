import React from 'react';
import {
  Navbar,
  Nav
} from 'react-bootstrap';

class Layout extends React.Component {

  constructor() {
    super();
    this.state = {
      result: {}
    };
  }

  render() {
    return(
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/" style={{ marginLeft: 15 }}>Magic Packet</Navbar.Brand>
        </Navbar>
      </>
    );
  };
}

export default Layout;
