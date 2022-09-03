import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeLayout from './layouts/HomeLayout';
import Home from './components/home/Home';
import Scan from './components/scan/Scan';
import { ThemeProvider,  createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

class App extends React.Component {

  render() { 
    return (
      <>
        <ThemeProvider theme={ darkTheme }>
          <CssBaseline />
          <BrowserRouter>
            <Box sx={{ display: "flex" }}>
              <Box>
                <HomeLayout />
              </Box>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/scan"  element={<Scan />} />
              </Routes>
            </Box>
          </BrowserRouter>
        </ThemeProvider>
      </>
    );
  }
}

export default App;
