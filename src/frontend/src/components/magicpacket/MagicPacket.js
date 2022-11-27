import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

class MagicPacket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: '',
      isIp: true
    }
    this.sendPacket = this.sendPacket.bind(this);
    this.validateIp = this.validateIp.bind(this);
  }

  componentDidMount = async () => {
  }

  validateIp(event) {
    if(event.target.value.length > 3) {
      this.setState({ isIp: false });
    } else {
      this.setState({ isIp: true });
    }
    this.setState({ ip: event.target.value });
  }

  sendPacket() {
    console.log(this.state.ip);
  }

  render() {
    return(
      <>
        <Box sx={{ flexGrow: 1, pb: 3}}>
          Input IP address for the target server you want to boot.
        </Box>
        <Box sx={{ flexGrow: 1, pb: 3 }}>
          <Grid container alignItems='center' direction='row'>
            <Grid sx={{ pr: 3 }}>
              { this.state.isIp
                ?
                  <TextField
                    id='ip'
                    label='IP address'
                    variant='outlined'
                    color='secondary'
                    onChange={ this.validateIp }
                  />
                :
                  <TextField
                    error
                    id='ip'
                    label='IP address'
                    variant='outlined'
                    color='secondary'
                    onChange={ this.validateIp }
                  />
              }
            </Grid>
            <Grid>
              <Button
                size="medium"
                onClick={ this.sendPacket }
                variant='contained'
                color='success'
              >
                Send Magic Packet
              </Button>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  };
}

export default MagicPacket;
