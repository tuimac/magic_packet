import React from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { API_URL } from '../config/environment';

class Scan extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hwip: {},
      if_info: {},
      api_data: {},
      loading: true
    }
    this.sendArp = this.sendArp.bind(this);
    this.getInterfaceInfo = this.getInterfaceInfo.bind(this);
  }  

  componentDidMount() {
    this.getInterfaceInfo();
  }

  getInterfaceInfo() {
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

  sendArp() {
    
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
            <FormControl sx={{ m: 1, minWidth: 240 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Network Interface Name</InputLabel>
              <Select
                id="nic"
                autoWidth
                label="Network Interface Name"
              >
                {this.state.api_data.data.result.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                  >
                    {name}
                  </MenuItem>
                ))} 
              </Select>
            </FormControl>
          </Box>
        </>
      );
    }
  };
}

export default Scan;
