import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  leaveGame,
  getGameUpdate,
  updateNewDirection,
  gameOver,
  findClientToServerLatencyTime,
} from '../../api/socketService';
import GamePage from '../Layout/GamePage';
import { arrowKeysDirections } from './constants';
import { getObjectDiffs } from './gameCore';
import PacmanBoard from './PacmanBoard';

class PacmanGame extends Component {
  state = {
    pacmans: {},
    ghosts: [],
    score: 0,
    status: 0, // 0 - Not-started, 1 - Progress, 2 - Restart
    gridState: [],
  };

  mount = false;

  componentDidMount() {
    this.mount = true;
    this.startGame();
  }

  shouldComponentUpdate(_, newState) {
    const printDiffs = (objDiffs, debug) => {
      if (debug && Object.keys(objDiffs).length > 0) {
        // eslint-disable-next-line no-console
        console.log('Diff is', (objDiffs));
      }
    };

    const onlyGhostMoveCountChange = objDiffs => (
      Object.keys(objDiffs).length === 1 && objDiffs.moveGhostsCount);

    const objDiffs = getObjectDiffs({ oldObj: this.state, newObj: newState });

    if (onlyGhostMoveCountChange(objDiffs)) {
      return false;
    }

    printDiffs(objDiffs, false);

    return true;
  }

  componentWillUnmount() {
    this.mount = false;
    leaveGame();
  }

  startGame = () => {
    const { userContext } = this.props;
    const { status } = this.state;
    const { playerId } = userContext;
    if (status === 1) {
      let { score } = this.state;
      clearInterval(this.animationHandler);
      score -= 10;
      this.setState({ status: 0, score });
      return;
    }
    if (status === 2) {
      this.setInitialGameState();
      this.setState({
        score: 0,
      });
      this.setState({ status: 1 });
    }
    if (status === 0) this.setState({ status: 1 });
    findClientToServerLatencyTime({ playerId });
    getGameUpdate(this.animateGame);
    gameOver(userContext);
    document.addEventListener('keydown', this.setDirection);
  };

  setGameStatus = (status) => {
    if (status === 'finish') {
      leaveGame();
      clearInterval(this.animationHandler);
      this.setState({ status: 2 });
    }
  }

  animateGame = ({ newState }) => {
    const {
      players, ghosts, gridState,
    } = newState;
    if (this.mount) {
      this.setState({
        gridState,
        ghosts,
        pacmans: players,
      });
    }
  }

  setDirection = ({ key }) => {
    const { userContext } = this.props;
    const { playerId } = userContext;
    const newDirection = arrowKeysDirections[key];
    if (newDirection !== undefined) {
      const { pacmans } = this.state;
      const { direction: oldDirection } = pacmans[playerId] !== undefined
        ? pacmans[playerId] : { direction: { x: 13, y: 14, direction: 'RIGHT' } };
      if (newDirection !== oldDirection) {
        updateNewDirection({ playerId, direction: newDirection });
      }
    }
  }

  render() {
    const { width: canvasWidth, numberofCells: cellsInEachRow } = this.props;
    const gridSize = canvasWidth / cellsInEachRow;
    const {
      gridState, pacmans, score, status, ghosts,
    } = this.state;
    return (
      <GamePage
        startGame={this.startGame}
        score={score}
        status={status}
        render={() => (
          <PacmanBoard
            {...{
              gridSize,
              gridState,
              pacmans,
              ghosts,
            }}
          />
        )}
      />
    );
  }
}

PacmanGame.propTypes = {
  width: PropTypes.number.isRequired,
  numberofCells: PropTypes.number.isRequired,
  userContext: PropTypes.shape().isRequired,
};

export default PacmanGame;
