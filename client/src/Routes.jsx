import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import NavBar from './components/UI/NavBar';

const PacmanRouter = () => (
  <div>
    <NavBar isLoggedIn />
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default PacmanRouter;
