import React from 'react';
import {
  Spinner,
  Table
} from 'react-bootstrap';

class Host extends React.Component {

  constructor() {
    super();
    this.state = {
      result: null
    };
  }

  componentDidMount() {
    const url = window.location.origin + '/api/host';
    fetch(url).then(res => res.json()).then(
      (result) => {
        this.setState({
          result: result,
        });
      },
      (error) => {
        this.setState({
          result: error
        });
      }
    );
  }

  createTable() {
    const result = this.state.result;
    console.log(result);
    console.log(result);
    const table = [];

    table.push(<Table striped bordered hover variant="dark"><tbody>);
    {
      Object.keys(result).map(keys =>
        <tr align="left"><td>{keys}</td><td>{result[keys] == null ? "N/A" : result[keys]}</td></tr>
      )
    }
    table.push(</tbody></Table>);

    return table;
  }

  render() {
    if(this.state.result == null) {
      return(
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
      )
    } else {
      return(
        <>
          { this.createTable() }
        </>
      )
    }
  };
}

export default Host;
