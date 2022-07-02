import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomeLayout from './layouts/HomeLayout';
import Home from './components/Home';

class App extends React.Component {
  return (
		<>
      <BrowserRouter>
        <div>
          <HomeLayout/>
          <div>
            <Switch>
              <Route component={ Home } path="/" exact />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
