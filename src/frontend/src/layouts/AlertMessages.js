import React from 'react';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Zoom from '@mui/material/Zoom';

class AlertMessages extends React.Component {
  constructor(props) {
    super(props);
    this.messageFramework = this.messageFramework.bind(this);
  }

  messageFramework(message, index) {
    return (
      <Zoom in={ true } key={ index } sx={{ px: 1 }}>
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
          severity={ message.severity }
          key={ index }
        >
          { message.message }
        </Alert>
      </Zoom>
    );
  }

  render() {
    if (this.props.alerts.length === 0) {
      return '';
    } else {
      return(
        <Box position='fixed'>
          <Stack>
            {this.props.alerts.map((message, index) => (
              this.messageFramework(message, index)
            ))}
          </Stack>
        </Box>
      );
    }
  };
}

export default AlertMessages;
