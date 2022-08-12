import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeLayout from './layouts/HomeLayout';
import Home from './components/Home';
import Scan from './components/Scan';
import { ThemeProvider,  createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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
            <HomeLayout />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/scan"  element={<Scan />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </>
    );
  }
}

export default App;
