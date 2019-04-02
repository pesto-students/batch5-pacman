/* eslint-disable react/no-unused-state */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import uuid from 'uuid';
import App from './App';
import { Provider } from './api/userContext';
import {
  createSocketConnection,
  joinGame,
  foundBothPlayer,
} from './api/socketService';

const playerId = uuid.v1();

class PacmanRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogIn: false,
      isGameStarted: false,
      username: '',
      login: this.login,
      logout: this.logout,
      startMultiPlayerGame: this.startMultiPlayerGame,
      startSinglePlayerGame: this.startSinglePlayerGame,
    };
  }

  login = user => this.setState({ username: user, isLogIn: true });

  logout = () => this.setState({ username: '', isLogIn: false });

  startMultiPlayerGame = () => {
    createSocketConnection((roomId) => {
      // eslint-disable-next-line no-consoles
      console.log('Connected to room: ', roomId);
    });
    const pacman = {
      x: 1,
      y: 5,
      direction: 'RIGHT',
    };
    joinGame({ playerId, ...pacman });
    foundBothPlayer(this);
  };

  startSinglePlayerGame = () => {
    this.setState({ isGameStarted: true });
  };

  render() {
    return (
      <Provider value={this.state}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={App} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default PacmanRouter;
