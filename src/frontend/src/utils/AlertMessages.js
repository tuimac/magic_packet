import React from 'react';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

class AlertMessages extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.alerts.length === 0) {
      return '';
    } else {
      return(
        <Stack sx={{ width: '100%', pb: 3 }}>
          {this.props.alerts.map((message, index) => (
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  key={ index }
                  onClick={() => {
                    this.props.deleteAlert(index);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ p: 0 }}
              variant='filled'
              severity='success'
              key={ index }
            >
              { message }
            </Alert>
          ))}
        </Stack>
      );
    }
  };
}

export default AlertMessages;
