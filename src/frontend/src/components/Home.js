import React from 'react';
import {
  Card,
  Container,
  Row,
  Col
} from 'react-bootstrap';
import EC2 from './EC2';
import Host from './Host';
import HttpHeader from './HttpHeader';

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      result: {}
    };
  }

  render() {
    return(
      <>
        <Container>
          <Row>
            <Col>
              <Card className="text-center">
                <Card.Header>
                  <h2>EC2/Host server Information</h2>
                </Card.Header>
                <Card.Body>
                  <EC2 />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="text-center">
                <Card.Header>
                  <h2>Docker Container Information</h2>
                </Card.Header>
                <Card.Body>
                  <Host />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className="text-center">
                <Card.Header>
                  <h2>Http Header Information</h2>
                </Card.Header>
                <Card.Body>
                  <HttpHeader />
                </Card.Body>
              </Card>
            </Col>
            <Col>
            </Col>
          </Row>
        </Container>
      </>
    );
  };
}

export default Home;
