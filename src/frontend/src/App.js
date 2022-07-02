import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeLayout from './layouts/HomeLayout';
import Home from './components/Home';

class App extends React.Component {
  render() { 
    return (
      <>
        <BrowserRouter>
          <div>
            <HomeLayout/>
            <div>
              <Routes>
                <Route component={ Home } path="/" exact />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
