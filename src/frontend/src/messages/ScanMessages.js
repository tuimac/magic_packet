import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

class ScanMessages {

  static getInterfaceInfo() {
    return (
     <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        varia
        sx={{ mb: 2 }}
      >
        Close me!
      </Alert>
    );
  }

  static getInterfaceList() {
  }

  static sendArp() {
  }
}

export default ScanMessages;
