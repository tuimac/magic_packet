import React from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { API_URL } from '../config/environment';

class Scan extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hwip: {},
      nic: '',
      nic_list: {},
      nic_info: '',
      loading: true
    }
    this.sendArp = this.sendArp.bind(this);
    this.getInterfaceInfo = this.getInterfaceInfo.bind(this);
    this.getInterfaceList = this.getInterfaceList.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getInterfaceList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.nic !== this.state.nic) {
      this.getInterfaceInfo();
    }
  }

  handleChange(event) {
    this.setState({ nic: event.target.value });
  }

  getInterfaceInfo() {
    let url = API_URL + '/interface/info/' + this.state.nic + '/';
    axios.get(url).then((res) => {
        this.setState({ nic_info: res.data.result, loading: false })
      })
      .catch((err) => {
        console.error(err);
        this.setState({ nic_info: { ip: '', subnet: '' }, loading: false })
      }
    )
  }

  getInterfaceList() {
    let url = API_URL + '/interface/list/';
    axios.get(url).then(res => {
        this.setState({ nic_list: res.data.result, loading: false })
      })
      .catch(err => {
        console.error(err);
      }
    )
  }

  sendArp() {
    let url = API_URL + '/interface/list/';
    axios.get(url).then(res => {
        this.setState({ api_data: res, loading: false })
        console.log(this.state.api_data);
      })
      .catch(err => {
        console.error(err);
      }
    )
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
          <Box sx={{ display: 'flex' }}>
            <div>
              <div>
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
              </div>
              <div>
                { this.generateInterfaceInfoCard() }
              </div>
            </div>
          </Box>
          <Box sx={{ display: 'flex' }}>
          </Box>
        </>
      );
    }
  };
}

export default Scan;
