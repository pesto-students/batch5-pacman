/* eslint-disable react/no-unused-state */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import { Provider } from './api/userContext';

class PacmanRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogIn: false,
      username: '',
      login: this.login,
      logout: this.logout,
    };
  }

  login = (user) => {
    this.setState({ username: user, isLogIn: true });
  };

  logout = () => {
    this.setState({ username: '', isLogIn: false });
  };

  render() {
    return (
      <div>
        <Provider value={this.state}>
          <BrowserRouter>
            <Switch>
              <Route path="/" component={App} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default PacmanRouter;
