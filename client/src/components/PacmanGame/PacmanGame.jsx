import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  leaveGame,
  getGameUpdate,
  updateNewDirection,
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

  componentDidMount() {
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
    leaveGame();
  }

  startGame = () => {
    const { status } = this.state;
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
    getGameUpdate(this.animateGame);
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
    try {
      const {
        pacmanOne, pacmanTwo, ghosts, gridState,
      } = newState;

      const players = {
        [pacmanOne.playerId]: pacmanOne,
        [pacmanTwo.playerId]: pacmanTwo,
      };

      this.setState({
        gridState,
        ghosts,
        pacmans: players,
      });
    } catch (e) {
      clearInterval(this.animationHandler);
    }
  }

  setDirection = ({ key }) => {
    const { playerId } = this.props;
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
  playerId: PropTypes.string.isRequired,
};

export default PacmanGame;
