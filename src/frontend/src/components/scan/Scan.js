import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ScanServices from '../../services/ScanServices';
import ScanMessages from '../../messages/ScanMessages';
import Utils from '../../utils/Utils';
import ScanResult from './ScanResult';
import CustomProgressBar from '../../utils/CustomProgressBar';

class Scan extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nic: '',
      nic_list: [],
      nic_info: '',
      loading: true,
      messages: [],
      scan_target: '',
      scan_result: [],
      scan_list_click_status: [],
      search_ip: '',
      search_stop: false,
      search_progress: '',
      search_start_time: 0
    }
    this.startScan = this.startScan.bind(this);
    this.stopScan = this.stopScan.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showLoadingStatus = this.showLoadingStatus.bind(this);
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
  }

  handleChange(event) {
    this.setState({ nic: event.target.value });
  }

  startScan = async () => {
    if (this.state.nic_info === '') {
      return '';
    } else {
      let ip_bin = Utils.string_to_int_ip(this.state.nic_info.ip);
      let subnet_bin = Utils.string_to_int_ip(this.state.nic_info.subnet);
      let target = ip_bin & subnet_bin;
      let max_index = 4294967295 - subnet_bin;
      let datetime = new Date();
      
      this.setState({ scan_result: [] });
      this.setState({ search_stop: false });
      this.setState({ search_start: datetime.getTime() })
      this.setState({ loading: true });

      // 4294967295 is 255.255.255.255
      for (var i = 0; i <= max_index; i++) {
        try {
          if (this.state.search_stop) {
            break;
          }
          let target_ip = Utils.int_to_string_ip(target++)
          this.setState({ search_ip: target_ip });
          this.setState({
            search_progress: {
              index: i,
              max_index: max_index
            }
          });
          let result = await ScanServices.sendArp(target_ip);

          let tmp_scan_result = this.state.scan_result;
          let tmp_scan_list_click_status = this.state.scan_list_click_status;

          if (result.body.op === '2') {
            tmp_scan_result.push(result);
            tmp_scan_list_click_status.push(false);
            this.setState({ 
              scan_result: tmp_scan_result,
              scan_list_click_status: tmp_scan_list_click_status
            });
          }
        } catch {
          continue;
        }
      }
      this.setState({ loading: false });
    }
  }

  stopScan() {
    this.setState({ search_stop: true });
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
          <CardActions>
            <Button size="medium" onClick={ this.stopScan }>Stop Scan</Button>
          </CardActions>
        </Card>
      );
    }
  }

  showLoadingStatus() {
    if (this.state.loading) {
      return (
        <CustomProgressBar
          index={ this.state.search_progress.index }
          max_index={ this.state.search_progress.max_index }
          ip={ this.state.search_ip }
          start_time={ this.state.search_start_time }
        />
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
                <InputLabel id='nic'>Network Interface Name</InputLabel>
                <Select id='nic' autoWidth label='nic' value={ this.state.nic } onChange={ this.handleChange }>
                  {this.state.nic_list.map((name) => (
                    <MenuItem key={ name } value={ name }>
                      { name }
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
            { this.showLoadingStatus() }
          </Grid>
        </Box>
        <Box>
          { this.state.scan_result.map((result, index) => ( <ScanResult result={ result } key={ index }/> ))}
        </Box>
      </>
    );
  };
}

export default Scan;
