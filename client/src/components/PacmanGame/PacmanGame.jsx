import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  leaveGame,
  getGameUpdate,
  updateNewDirection,
  gameOver,
  findClientToServerLatencyTime,
  syncUpdates,
} from '../../api/socketService';
import GamePage from '../Layout/GamePage';
import { arrowKeysDirections, advanceFrameAfterTime } from './constants';
import {
  getObjectDiffs, predictPacmanMove, predictFoodEat,
} from './gameCore';
import PacmanBoard from './PacmanBoard';

class PacmanGame extends Component {
  state = {
    players: {},
    ghosts: [],
    score: 0,
    gridState: [],
    lastClientDirection: '',
    clientPrediction: false,
  };

  mount = false;

  componentDidMount() {
    this.mount = true;
    syncUpdates({ syncFn: this.predictPacman, frameRate: advanceFrameAfterTime });
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

  predictPacman = () => {
    const { userContext: { playerId } } = this.props;
    const { players, gridState, ghosts } = this.state;
    if (players[playerId] === undefined) {
      return;
    }
    const { pacmanUpdated } = predictPacmanMove({ pacman: players[playerId], gridState });
    players[playerId] = pacmanUpdated;

    const { gridStateAfterEating } = predictFoodEat({ pacmanUpdated, gridState });

    // render the new gridState and pacman
    // console.log('triggerPredictionAt', new Date().getTime());
    const newState = {
      players,
      gridState: gridStateAfterEating,
      // gridState,
      ghosts,
    };
    this.animateGame({ newState, clientPrediction: true });

    // For server reconciliation,
    // onsocket update, compare and update to correct state
    // then animate

    // store last client direction
    // if last dir on server received pos === current pos
    // ignore
  }

  reconcileServer = ({ newState }) => {
    const { userContext } = this.props;
    const { playerId } = userContext;
    const { players: currentPlayers, lastClientDirection } = this.state;
    const { players: newPlayers } = newState;

    if (currentPlayers[playerId] !== undefined && newPlayers[playerId] !== undefined) {
      const myPacmanCurrentPosition = { ...currentPlayers[playerId], score: 0 };
      const myPacmanNewPosition = newPlayers[playerId];
      // myPacmanNewPosition.direction = lastClientDirection;
      const myPacmanNewPositionWithLastClientDir = {
        ...myPacmanNewPosition,
        direction: lastClientDirection,
        score: 0,
      };

      const reconcileServer = getObjectDiffs({
        oldObj: myPacmanCurrentPosition,
        newObj: myPacmanNewPositionWithLastClientDir,
      });
      if (currentPlayers[playerId].direction !== newPlayers[playerId].direction) {
        console.log(Object.keys(reconcileServer).length === 0);
      }
      if (Object.keys(reconcileServer).length === 0) {
        // console.log('server reconciliated. Bitch!');
        // return;

        // eslint-disable-next-line no-param-reassign
        newState.players[playerId].x = currentPlayers[playerId].x;
        // eslint-disable-next-line no-param-reassign
        newState.players[playerId].y = currentPlayers[playerId].y;
        // eslint-disable-next-line no-param-reassign
        newState.players[playerId].direction = currentPlayers[playerId].direction;
      }
      console.log('reconcileServer', JSON.stringify(reconcileServer));
    }

    // console.log(newState.players[playerId]);

    this.animateGame({ newState });
  }

  startGame = () => {
    const { userContext } = this.props;
    const { playerId } = userContext;
    findClientToServerLatencyTime({ playerId });
    getGameUpdate(this.reconcileServer);

    gameOver(userContext);
    document.addEventListener('keydown', this.setDirection);
    // setInterval(this.predictPacman, advanceFrameAfterTime);
  };

  animateGame = ({ newState, clientPrediction = false }) => {
    if (this.mount) {
      try {
        const {
          players, ghosts, gridState,
        } = newState;

        this.setState({
          gridState,
          ghosts,
          players,
          clientPrediction,
        });
      } catch (e) {
        clearInterval(this.predictPacman);
        // eslint-disable-next-line no-console
        console.log('Error', e.stack);
        // eslint-disable-next-line no-console
        console.log('Error', e.name);
        // eslint-disable-next-line no-console
        console.log('Error', e.message);
      }
    }
  }

  setDirection = ({ key }) => {
    const { userContext } = this.props;
    const { playerId } = userContext;
    const newDirection = arrowKeysDirections[key];
    if (newDirection !== undefined) {
      const { players } = this.state;
      const { direction: oldDirection } = players[playerId] !== undefined
        ? players[playerId] : { direction: { x: 13, y: 14, direction: 'RIGHT' } };
      if (newDirection !== oldDirection) {
        updateNewDirection({ playerId, direction: newDirection });
        players[playerId].direction = newDirection;
        this.setState({ players, lastClientDirection: newDirection });
        // this.predictPacman();
      }
    }
  }

  render() {
    const { width: canvasWidth, numberofCells: cellsInEachRow, userContext } = this.props;
    const gridSize = canvasWidth / cellsInEachRow;
    const { playerId } = userContext;
    const {
      gridState, players, score, ghosts, clientPrediction,
    } = this.state;
    return (
      <GamePage
        startGame={this.startGame}
        score={score}
        playerId={playerId}
        players={players}
        status={1}
        render={() => (
          <PacmanBoard
            {...{
              gridSize,
              gridState,
              players,
              ghosts,
              clientPrediction,
              playerId,
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
