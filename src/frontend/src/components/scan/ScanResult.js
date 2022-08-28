import React from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

class ScanResult extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      click: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ click: !this.state.click });
  }

  render() {
    return(
      <List>
        <ListItemButton onClick={ this.handleClick }>
          <ListItemText primary={ this.props.result.hwvendor === '' ? 'Not Found Device Name': this.props.result.hwvendor } />
          <ListItemText primary={ '(' + this.props.result.body.src_ip + ')'} />
          { this.click ? <ExpandLess /> : <ExpandMore /> }
        </ListItemButton>
        <Collapse in={ this.state.click } timeout='auto' unmountOnExit>
          <List>
            <ListItem>
              <ListItemText sx={{ pl: 4 }} secondary={ 'Timestamp: ' + this.props.result.timestamp } />
            </ListItem>
            <ListItem>
              <ListItemText sx={{ pl: 4 }} secondary={ 'Ethernet Type: ' + this.props.result.header.ether_type } />
            </ListItem>
            <ListItem>
              <ListItemText sx={{ pl: 4 }} secondary={ 'Hardware Type: ' + this.props.result.body.ht } />
            </ListItem>
            <ListItem>
              <ListItemText sx={{ pl: 4 }} secondary={ 'Protocol Type: ' + this.props.result.body.pt } />
            </ListItem>
            <ListItem>
              <ListItemText sx={{ pl: 4 }} secondary={ 'Hardware Address Length: ' + this.props.result.body.hal } />
            </ListItem>
            <ListItem>
              <ListItemText sx={{ pl: 4 }} secondary={ 'Operation Code: ' + this.props.result.body.op } />
            </ListItem>
            <ListItem>
              <ListItemText sx={{ pl: 4 }} secondary={ 'Destination Mac Address: ' + this.props.result.body.src_mac } />
            </ListItem>
            <ListItem>
              <ListItemText sx={{ pl: 4 }} secondary={ 'Destination IP Address: ' + this.props.result.body.src_ip } />
            </ListItem>
            <ListItem>
              <ListItemText sx={{ pl: 4 }} secondary={ 'Source Mac Address: ' + this.props.result.body.dest_mac } />
            </ListItem>
            <ListItem>
              <ListItemText sx={{ pl: 4 }} secondary={ 'Source IP Address: ' + this.props.result.body.dest_ip } />
            </ListItem>
          </List>
        </Collapse>
      </List>
    );
  };
}

export default ScanResult;
