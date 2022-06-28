import React from 'react';
import {
  Container
} from 'react-bootstrap';
import { API_URL } from '../config/config';

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      result: {}
    };
  }

  render() {
    console.log(API_URL);
    return(
      <>
        <Container>
          
        </Container>
      </>
    );
  };
}

export default Home;
