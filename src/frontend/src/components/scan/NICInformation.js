import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

class NICInformation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ip: '',
      subnet: '',
      nic: ''
    };
  }

  componentDidMount() {
    this.setState({
      ip: this.props.nic_info.ip,
      subnet: this.props.nic_info.subnet,
      nic: this.props.nic
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.nic !== this.state.nic) {
      this.setState({
        ip: this.props.nic_info.ip,
        subnet: this.props.nic_info.subnet,
        nic: this.props.nic
      });
    }
  }

  render() {
    if (this.props.nic_info === '') {
      return '';
    } else {
      if (this.state.ip === '' || this.state.subnet === '') {
        return(
          <Card variant='outlined'>
            <CardContent>
              <Typography variant="body1">
                IP address: There is no IP address
              </Typography>
              <Typography variant="body1">
                Subnet Mask: There is no Subnet mask
              </Typography>
            </CardContent>
          </Card>
        );
      } else {
        return (
          <Card variant='outlined'>
            <CardContent>
              <Typography variant="body1">
                IP address: { this.state.ip }
              </Typography>
              <Typography variant="body1">
                Subnet Mask: { this.state.subnet }
              </Typography>
            </CardContent>
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
          </Card>
        );
      }
    }
  };
}

export default NICInformation;
