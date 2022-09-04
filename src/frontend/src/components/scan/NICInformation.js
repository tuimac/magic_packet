import React from 'react';

class NICInformation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ip: '',
      subnet: ''
    };
    this.handleButton = this.handleButton.bind(this);
  }

  componentDidMount() {
    this.setState({
      ip: this.props.nic_info.ip,
      subnet: this.props.nic_info.subnet
    })
  }

  handleButton() {
    if (this.state.ip === '' || this.state.subnet === '') {
      return '';
    } else {
      return (
        <CardActions>
          <Button
            size="medium"
            onClick={ this.props.startScan }
            variant='contained'
            color='success'
            startIcon={ <PlayArrowIcon /> }
          >
            Start Scan
          </Button>
          <Button
            size="medium"
            onClick={ this.props.stopScan }
            variant='outlined'
            color='error'
            startIcon={ <StopIcon /> }
          >
            Stop Scan
          </Button>
        </CardActions>
      );
    }
  }

  render() {
    if (this.props.nic_info === '') {
      return '';
    } else {
      return(
        <Card variant='outlined'>
          <CardContent>
            <Typography variant="body1">
              IP address: { this.state.ip }
            </Typography>
            <Typography variant="body1">
              Subnet Mask: { this.state.subnet }
            </Typography>
          </CardContent>
          { this.handleButton }
        </Card>
      );
    }
  };
}

export default NICInformation;
