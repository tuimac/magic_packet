import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
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
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import ScanServices from '../services/ScanServices';
import ScanMessages from '../messages/ScanMessages';
import Utils from '../utils/Utils';

class Scan extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nic: '',
      nic_list: [],
      nic_info: '',
      loading: true,
      messages: [],
      scan_result: [],
      scan_list_click_status: {}
    }
    this.startScan = this.startScan.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showLoading = this.showLoading.bind(this);
    this.handleClickScanList = this.handleClickScanList.bind(this);
  }

  componentDidMount = async () => {
    this.setState({
      nic_list: await ScanServices.getInterfaceList(),
      loading: false
    })
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevState.nic !== this.state.nic) {
      this.setState({ nic_info: await ScanServices.getInterfaceInfo(this.state.nic) })
    }
    if (prevState.scan_result.length !== this.state.scan_result.length) {
      this.forceUpdate();
    }
  }

  handleChange(event) {
    this.setState({ nic: event.target.value });
  }

  handleClickScanList(index) {
    this.setState({
      scan_list_click_status: {
        [index]: !this.scan_list_click_status
      }
    });
  }

  startScan = async () => {
    if (this.state.nic_info === '') {
      return '';
    } else {
      let ip_bin = Utils.string_to_int_ip(this.state.nic_info.ip);
      let subnet_bin = Utils.string_to_int_ip(this.state.nic_info.subnet);
      console.log(ip_bin);
      console.log(subnet_bin);
      let target = ip_bin & subnet_bin;
      this.setState({ loading: true });

      // 4294967295 is 255.255.255.255
      for (var i = 0; i < 4294967295 - subnet_bin; i++) {
        target++;
        let result = await ScanServices.sendArp(target);
        if (result.body.op === '2') {
          this.state.scan_result.push(result);
        }
      }
      this.setState({ loading: false });
    }
  }

  showInterfaceInfoCard() {
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
            <Button size="medium" onClick={ this.startScan }>Start Scan</Button>
          </CardActions>
        </Card>
      );
    }
  }

  showLoading() {
    if (this.state.loading) {
      return (
        <CircularProgress />
      );
    } else {
      return '';
    }
  }

  render() {
    return(
      <>
        <Box sx={{ flexGrow: 1}}>
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
              { this.showInterfaceInfoCard() }
            </Grid>
            <Grid container direction='row' justifyContent='flex-end' alignItems='stretch'>
              <ScanMessages messages={ this.state.messages }/>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid>
            { this.showLoading() }
          </Grid>
        </Box>
        <Box>
          <div>
            <List>
              {this.state.scan_result.map((result, index) => (
                <ListItemButton onClick={ this.handleClickScanList({index}) }>
                  <ListItemText primary={ result.body.src_ip } />
                  { this.state.scan_list_click_status[{index}] ? <ExpandLess /> : <ExpandMore /> }
                </ListItemButton>
              ))}
            </List>
          </div>
        </Box>
      </>
    );
  };
}

export default Scan;
