import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppRoutes from './utils/routes';
import './App.css';
import AuthContextProvider from './contexts/AuthContext';
import PrivateRoute from './components/privateRoute';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          {AppRoutes.map(appRoute => {
            return appRoute.isPrivate ? (
              <PrivateRoute key={appRoute.name} exact={appRoute.exact} path={appRoute.link} component={appRoute.component} />
            )
            :  (
              <Route key={appRoute.name} exact={appRoute.exact} path={appRoute.link} component={appRoute.component} />
            )
          })}
        </Switch>
      </Router>
    </AuthContextProvider>
      
    
  );
}

export default App;
