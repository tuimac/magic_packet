import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import Home from './components/Home';
import Runcommand from './components/Runcommand';
import Layout from './components/Layout';

class App extends React.Component {
  
  render() {
    return (
			<>
        <BrowserRouter>
          <div>
            <Layout/>
            <div>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
                <Route component={ Home } path="/home" exact />
                <Route component={ Runcommand } path="/runcommand" exact />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
