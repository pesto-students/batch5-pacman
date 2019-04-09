/* eslint-disable react/no-unused-state */
import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import uuid from 'uuid';
import App from './App';
import { Provider } from './api/userContext';
import {
  createSocketConnection,
  joinGame,
  foundBothPlayer,
} from './api/socketService';

const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:9000';

class PacmanRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogIn: false,
      isGameStarted: false,
      isGameEnd: false,
      score: null,
      username: '',
      isMulti: false,
      playerId: uuid.v1(),
      login: this.login,
      logout: this.logout,
      startMultiPlayerGame: this.startMultiPlayerGame,
      startSinglePlayerGame: this.startSinglePlayerGame,
      setScore: this.setScore,
      setEndGame: this.setEndGame,
      saveScore: this.saveScore,
    };
  }

  login = (user, score) => {
    this.setState({ username: user, isLogIn: true, score });
  };

  logout = () => this.setState({ username: '', isLogIn: false, score: null });

  startMultiPlayerGame = () => {
    const { playerId } = this.state;
    createSocketConnection((roomId) => {
      // eslint-disable-next-line no-console
      console.log('Connected to room: ', roomId);
    });
    joinGame({ playerId });
    foundBothPlayer(this);
  };

  startSinglePlayerGame = () => {
    this.setState({ isGameStarted: true, isGameEnd: false });
  };

  setScore = (newScore) => {
    const { score, isLogIn } = this.state;
    const updatedScore = Number(score) > Number(newScore) ? Number(score) : Number(newScore);
    this.setState({
      score: newScore,
      isGameEnd: true,
      isGameStarted: false,
      isMulti: false,
    });
    if (isLogIn) this.saveScore(updatedScore);
  };

  setEndGame = () => {
    this.setState({ isGameEnd: true });
  }

  saveScore = (score) => {
    const { username } = this.state;
    axios.post(`${serverUrl}/score`, {
      username,
      score,
    })
      .then(() => {})
      .catch(() => {});
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
