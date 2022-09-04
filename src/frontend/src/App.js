import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider,  createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import HomeLayout from './layouts/HomeLayout';
import AlertMessages from './utils/AlertMessages';
import MagicPacket from './components/magicpacket/MagicPacket';
import Scan from './components/scan/Scan';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        ::-webkit-scrollbar {
            width: 8px;
        },
        ::-webkit-scrollbar-thumb {
            background-color: #4682b4;
            border-radius: 8px;
        }`
    },
  },
});

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
			alerts: []
    }
    this.deleteAlert = this.deleteAlert.bind(this);
    this.addAlert = this.addAlert.bind(this);
  }

  deleteAlert(index) {
    let tmp_alerts = this.state.alerts;
    tmp_alerts.splice(index, 1)
    this.setState({ alerts: tmp_alerts });
  }

  addAlert(message) {
    let tmp_alerts = this.state.alerts;
    tmp_alerts.push(message);
    this.setState({ alerts: tmp_alerts });
  }

  render() {
    return (
      <>
        <ThemeProvider theme={ darkTheme }>
          <CssBaseline />
          <BrowserRouter>
            <HomeLayout />
            <AlertMessages alerts={ this.state.alerts } deleteAlert={ this.deleteAlert } />
            <Box sx={{ px: 2 }}>
              <Routes>
                <Route exact path="/" element={<MagicPacket addAlert={ this.addAlert }/>} />
                <Route exact path="/scan"  element={<Scan addAlert={ this.addAlert }/>} />
              </Routes>
            </Box>
          </BrowserRouter>
        </ThemeProvider>
      </>
    );
  }
}

export default App;
