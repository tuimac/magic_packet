import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import Home from './components/Home';
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
                  <Redirect to="/" />
                </Route>
                <Route component={ Home } path="/" exact />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
