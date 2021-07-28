import React from 'react';
import { Router, Switch, Route } from 'react-router';
import history from './history';
import './App.css';
import routes from './routes/routeConfigurations';
import PrivateRoute from './components/BO/Auth/PrivateRoute';

const generateRoutes = () => routes.map((route, key) => route.private !== false ? <PrivateRoute key={key} {...route} /> : <Route key={key} {...route} />);

function App() {
  return (
      <Router history={history}>

        <Switch>
        
          {generateRoutes()}

        </Switch>
      </Router>
  );
}

export default App;
