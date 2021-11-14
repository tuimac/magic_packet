import React from 'react';
import {
  Nav,
  Navbar
} from 'react-bootstrap';

class Layout extends React.Component {

  render() {
    return(
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Server Tools</Navbar.Brand>
          <Nav variant="pills">
            <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/runcommand">Runcommmand</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar>
      </div>
    );
  };
}

export default Layout;
