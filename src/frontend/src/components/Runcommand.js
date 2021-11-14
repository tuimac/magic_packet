import React from 'react';
import { Card, Col, Container, Row, Button, ProgressBar } from 'react-bootstrap';
import Console from './Console';
import axios from 'axios';

class Runcommand extends React.Component {

  constructor() {
    super();
    this.state = {
      file: null,
      progress: 0
    };
  }

  handleChengeFile = (event) => {
    this.setState({
      file: event.target.files[0]
    })
  }

  handleSubmit = () => {
    const url = window.location.origin + '/api/upload/';
    const formData = new FormData();
    formData.append('file', this.state.file);
    axios.post(
      url,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: data => {
          this.setState({
            progress: Math.round((100 * data.loaded) / data.total)
          })
        }
      }
    ).then(res => {
      if(res.data.result === 'success') {
        console.log('success');
      } else {
        console.error('failure');
      }; 
    })
  }
  
  render() {
    return (
      <>
        <Container>
          <Row>
            <Col>
              <Card className="text-left">
                <Card.Header>
                  <h3>Terminal</h3>
                </Card.Header>
                <Card.Body>
                  <Console />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Card className="text-left">
              <Card.Header>
                <h3>File Upload</h3>
              </Card.Header>
              <Card.Body>
                <h5>This file will upload to '/upload'.</h5>
                <input type="file" onChange={this.handleChengeFile} /><br/><br/>
                <ProgressBar now={this.progress}/><br/>
                <Button variant="dark" onClick={this.handleSubmit}>Upload</Button>
              </Card.Body>      
            </Card>
          </Row>
        </Container>
      </>
    );
  };
};

export default Runcommand;
