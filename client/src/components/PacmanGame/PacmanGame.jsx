import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import {
  createSocketConnection,
  joinGame,
  leaveGame,
  getGameUpdate,
  updateNewDirection,
} from '../../api/socketService';
import GamePage from '../Layout/GamePage';
import {
  // boardCorners,
  // codeToEntity,
  // entityToCode,
  // getGhosts,
  // getPacman,
  // boardTranspose,
  arrowKeysDirections,
} from './constants';
import {
  // initSquareGridState,
  // isWall,
  // getRandomAdjacentAvailableCell,
  // moveInDirection,
  // getGridwithWeights,
  // chaseLocation,
  getObjectDiffs,
} from './gameCore';
import PacmanBoard from './PacmanBoard';

class PacmanGame extends Component {
  state = {
    pacmans: {

    },
    ghosts: [],
    score: 0,
    status: 0, // 0 - Not-started, 1 - Progress, 2 - Restart
    gridState: [],
    // config: {
    //   refreshRate: advanceFrameAfterTime,
    // },
    // moveGhostsCount: 0,
    // scatterGhostspath: [],
    // scatterStart: 75,
    playerId: uuid.v1(),
  };

  componentDidMount() {
    createSocketConnection((roomId) => {
      // eslint-disable-next-line no-console
      console.log('Connected to room: ', roomId);
      // this.setState({ roomId });
    });
    // this.setInitialGameState();
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


  // setInitialGameState = () => {
  //   const gridState = initSquareGridState();
  //   const [pacmanX, pacmanY, pacmanDirection] = getPacman();
  //   const pacman = {
  //     x: pacmanX, y: pacmanY, direction: pacmanDirection,
  //   };

  //   const ghostsArray = getGhosts().map(([x, y, direction]) => ({
  //     x, y, direction,
  //   }));

  //   this.setState({ gridState, pacman, ghosts: ghostsArray });
  // }

  startGame = () => {
    const {
      pacmans, status, playerId,
    } = this.state;
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
        // moveGhostsCount: 0,
      });
      this.setState({ status: 1 });
    }
    if (status === 0) this.setState({ status: 1 });
    joinGame({ playerId, ...pacmans });
    getGameUpdate(this.animateGame);
    // this.animationHandler = setInterval(
    //   this.animateGame,
    //   config.refreshRate,
    // );
    document.addEventListener('keydown', this.setDirection);
  };

  // addPositionsToArray = (arr, index) => {
  //   const scatterTime = 55;
  //   if (arr.length < scatterTime) {
  //     arr.push(boardCorners[index]);
  //     return this.addPositionsToArray(arr, index);
  //   }
  //   return arr;
  // }

  // moveGhosts = ({ ghosts, gridState, scatterStart }) => {
  //   let { moveGhostsCount, scatterGhostspath } = this.state;
  //   moveGhostsCount += 1;
  //   const scatterEnd = scatterStart + 55;
  //   if (moveGhostsCount === scatterStart) {
  //     const gridWithWeights = getGridwithWeights(boardTranspose);
  //     const ghostsPath = ghosts
  //       .map((ghost, index) => chaseLocation(gridWithWeights, ghost, boardCorners[index]))
  //       .map(postion => postion.map(arr => ({ x: arr[0], y: arr[1] })));

  //     scatterGhostspath = ghostsPath
  //       .map((array, index) => this.addPositionsToArray(array, index));
  //     this.setState({
  //       scatterGhostspath,
  //     });
  //   }

  //   if (moveGhostsCount === scatterEnd) {
  //     const ghostsUpdated = [
  //       { x: 1, y: 1, direction: 'LEFT' },
  //       { x: 23, y: 1, direction: 'LEFT' },
  //       { x: 1, y: 23, direction: 'LEFT' },
  //       { x: 23, y: 23, direction: 'LEFT' }];
  //     return {
  //       ghostsUpdated, moveGhostsCount,
  //     };
  //   }

  //   if (moveGhostsCount > (scatterStart + 1) && moveGhostsCount < scatterEnd) {
  //     const ghostsUpdated = scatterGhostspath.map(path => path[moveGhostsCount - scatterStart]);
  //     return {
  //       ghostsUpdated, moveGhostsCount,
  //     };
  //   }

  //   const ghostsUpdated = ghosts.map(
  //     ({ x, y, direction }) => getRandomAdjacentAvailableCell(gridState, { x, y, direction }),
  //   );
  //   return {
  //     ghostsUpdated, moveGhostsCount,
  //   };
  // };

  setGameStatus = (status) => {
    if (status === 'finish') {
      leaveGame();
      clearInterval(this.animationHandler);
      this.setState({ status: 2 });
    }
  }

  // ifAtGhosts = ({ ghosts, pacman }) => {
  //   const isAtSameLocation = (
  //     { x: x1, y: y1 },
  //     { x: x2, y: y2 },
  //   ) => (x1 === x2) && (y1 === y2);

  //   const ispacmanDead = ghosts
  //     .some(ghost => isAtSameLocation(ghost, pacman));

  //   return ispacmanDead;
  // };

  // movePacman = ({ pacman, ghostsUpdated, gridState }) => {
  //   const { x, y, direction } = pacman;

  //   const pacmanDead = this.dieIfOnGhost({ ghosts: ghostsUpdated, pacman });

  //   if (pacmanDead) {
  //     return {
  //       pacmanUpdated: pacman,
  //     };
  //   }

  //   let newLocation = moveInDirection({ x, y, direction });

  //   newLocation = isWall(gridState, newLocation) ? {} : moveInDirection({ x, y, direction });
  //   return {
  //     pacmanUpdated: { ...pacman, ...newLocation },
  //   };
  // }

  // eatFood = ({ pacman: newLocation, gridStateAfterPacmanMove }) => {
  //   const gridState = gridStateAfterPacmanMove;
  //   const entityInCell = codeToEntity(gridState[newLocation.x][newLocation.y]);
  //   let { score } = this.state;
  //   if (entityInCell === 'food') {
  //     score += 1;
  //   } else if (entityInCell === 'energizer') {
  //     score += 5;
  //   }
  //   gridState[newLocation.x][newLocation.y] = entityToCode('free');
  //   return { score, gridState };
  // }

  // dieIfOnGhost = ({ ghosts, pacman }) => {
  //   if (this.ifAtGhosts({ ghosts, pacman })) {
  //     this.setGameStatus('finish');
  //     return true;
  //   }
  //   return false;
  // }

  animateGame = ({ newState }) => {
    try {
      const {
        pacmanOne, pacmanTwo, ghosts, gridState,
      } = newState;

      // eslint-disable-next-line no-console
      // console.log('Game state:', newState);
      // const { ghostsUpdated, moveGhostsCount } = this.moveGhosts(
      //   { ghosts, gridState, scatterStart },
      // );
      // const { pacmanUpdated } = this.movePacman({ pacman, ghostsUpdated, gridState });

      // this.dieIfOnGhost({ ghosts: ghostsUpdated, pacman: pacmanUpdated });

      // const {
      //   score,
      //   gridState: gridStateAfterEating,
      // } = this.eatFood({ pacman, gridStateAfterPacmanMove: gridState });
      const players = {
        [pacmanOne.playerId]: pacmanOne,
        [pacmanTwo.playerId]: pacmanTwo,
      };

      // console.log(players);

      // const pacmans = {
      //   playerId: {
      //     x,y,d,
      //   }
      // }

      // cosnt pacmans = Object.keys(pacmans).map(pacmanId => {
      //   const {
      //     x,y,d,
      //   } = pacmans[pacmanId];

      //   return {
      //     newX, newY, newD
      //   }
      // })


      this.setState({
        // gridState: gridStateAfterEating,
        gridState,
        // score,
        // moveGhostsCount,
        // ghosts: ghostsUpdated,
        // pacman: pacmanUpdated,
        ghosts,
        pacmans: players,
      });
      // updateGameState({ pacman, playerId, roomId });
    } catch (e) {
      clearInterval(this.animationHandler);
    }
  }

  setDirection = ({ key }) => {
    const newDirection = arrowKeysDirections[key];
    if (newDirection !== undefined) {
      const { pacmans, playerId } = this.state;
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
};

export default PacmanGame;
