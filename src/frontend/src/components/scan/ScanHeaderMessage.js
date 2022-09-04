import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';

class ScanHeaderMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      nic: ''
    };
  }

  componentDidMount() {
    this.setState({
      open: true,
      nic: this.props.nic
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.nic !== this.state.nic) {
      this.setState({ nic: this.props.nic });
      if (this.state.nic != '') {
        this.setState({ open: false });
      }
    }
  }

  render() {
    if (this.props.nic === '') {
      return (
        <Fade in={ this.state.open }>
          <Box sx={{ pb: 2 }}>
            <Typography variant='body1'>
              Select Network Interface Name in the list below.
            </Typography>
          </Box>
        </Fade>
      );
    } else {
      return '';
    }
  };
}

export default ScanHeaderMessage;
