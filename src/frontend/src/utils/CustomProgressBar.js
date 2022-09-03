import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import Utils from './Utils.js'

class CustomProgressBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Card>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress
                variant="determinate"
                value={ Math.floor(this.props.index / this.props.max_index * 100) }
              />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">
                { `${ Math.floor(this.props.index / this.props.max_index * 100) }%` }
              </Typography>
            </Box>
          </Box>
        </Card>
        <Card>
          <Typography variant="body1">
            Searching IP:  { this.props.ip }
          </Typography>
          <Typography variant="body1">
            Searching Time: { Utils.getTimeStamp(this.props.start_time) }
          </Typography>
        </Card>
      </div>
    );
  };
}

export default CustomProgressBar;
