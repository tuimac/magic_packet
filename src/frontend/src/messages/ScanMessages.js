import React from 'react';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

class ScanMessages extends React.Component {
  constructor(props) {
    super(props);
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.messages.length !== this.props.messages.length) {
			this.forceUpdate();
    }
  }

  deleteMessage(index) {
    console.log(index);
    this.props.messages.splice(index, 1);
    this.forceUpdate();
  }

  render() {
		return(
			<>
        <Stack spacing={2}>
          {this.props.messages.map((message, index) => (
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  key={ message }
                  onClick={() => {
                    this.deleteMessage(index);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
              key={ index }
            >
              { message }
            </Alert>
          ))}
        </Stack>
			</>
		);
  };
}

export default ScanMessages;
