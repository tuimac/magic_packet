import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ScanServices from '../services/ScanServices';

class Scan extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hwip: {},
      nic: '',
      nic_list: {},
      nic_info: '',
      loading: true,
      erro_msg: ''
    }
    this.sendArp = this.sendArp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = async () => {
    this.setState({
      nic_list: await ScanServices.getInterfaceList(),
      loading: false
    })
    console.log(this.state)
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevState.nic !== this.state.nic) {
      this.setState({ nic_info: await ScanServices.getInterfaceInfo(this.state.nic) })
    }
  }

  handleChange(event) {
    this.setState({ nic: event.target.value });
  }

  sendArp() {
    if (this.state.nic_info === '') {

    } else {
    }
  }

  generateInterfaceInfoCard() {
    if (this.state.nic_info === '') {
      return '';
    } else {
      let ip;
      let subnet;

      if (this.state.nic_info.ip === '') {
        ip = "There is no IP address.";
      } else {
        ip = this.state.nic_info.ip;
      }
      if (this.state.nic_info.subnet === '') {
        subnet = "There is no subnet mask.";
      } else {
        subnet = this.state.nic_info.subnet;
      }

      return(
        <Card variant='outlined'>
          <CardContent>
            <Typography variant="body1">
              IP address: { ip }
            </Typography>
            <Typography variant="body1">
              Subnet Mask: { subnet }
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="medium">Start Scan</Button>
          </CardActions>
        </Card>
      );
    }
  }

  render() {
    if(this.state.loading) {
      return(
        <CircularProgress />
      )
    } else {
      return(
        <>
          <Grid container>
            <Grid>
              <FormControl sx={{ m: 1, minWidth: 240 }}>
                <InputLabel id="nic">Network Interface Name</InputLabel>
                <Select
                  id="nic"
                  autoWidth
                  label="Network Interface Name"
                  value={ this.state.nic }
                  onChange={ this.handleChange }
                >
                  {this.state.nic_list.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                    >
                      {name}
                    </MenuItem>
                  ))} 
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              { this.generateInterfaceInfoCard() }
            </Grid>
          </Grid>
        </>
      );
    }
  };
}

export default Scan;
