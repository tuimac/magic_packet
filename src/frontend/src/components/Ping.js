import React from 'react';
import {
  Container
} from 'react-bootstrap';
import { API_URL } from '../config/config';

class Ping extends React.Component {

  constructor() {
    super();
    this.state = {
      result: {}
    };
  }

  ping() {
    try {
      let url = window.location.origin + '/api/item/';

      if(
        this.state.name === '' ||
        this.state.count === '' ||
        this.state.owner === ''
      ) {
        throw new Error('Invalid input from form.')
      }

      axios.post(url, {
        name: this.state.name,
        count: this.state.count,
        owner: this.state.owner
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.err(err);
        })
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    return(
      <>
        <Container>
          
        </Container>
      </>
    );
  };
}

export default Ping;
