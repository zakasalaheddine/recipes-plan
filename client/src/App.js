import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppRoutes from './utils/routes';

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        {AppRoutes.map(appRoute => (
          <Route key={appRoute.name} exact={appRoute.exact} path={appRoute.link} component={appRoute.component} />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
