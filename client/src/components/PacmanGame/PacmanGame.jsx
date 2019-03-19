import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pathfinding from 'pathfinding';
import GamePage from '../Layout/GamePage';

import {
  initSquareGridState,
  getFoods,
  getGhosts,
  getPacman,
  getWalls,
  codeToEntity,
  getEnergizers,
  entityToCode,
  entityApplier,
  isWall,
  getRandomAdjacentAvailableCell,
} from './gameCore';
import PacmanBoard from './PacmanBoard';

class PacmanGame extends Component {
  state = {
    pacman: {
      x: 1,
      y: 5,
      direction: 'RIGHT',
    },
    ghosts: [],
    score: 0,
    status: 0, // 0 - Not-started, 1 - Progress, 2 - Finished, 3 - Paused
    gridState: [],
    config: {
      refreshRate: 200,
    },
  };

  componentDidMount() {
    this.setInitialGameState();
  }

  setInitialGameState = () => {
    const { numberofCells: cellsInEachRow } = this.props;
    const gridState = initSquareGridState(cellsInEachRow);

    const entitiesLocation = {
      food: getFoods(),
      pacman: getPacman(),
      wall: getWalls(cellsInEachRow),
      ghost: getGhosts(),
      energizer: getEnergizers(),
    };

    const ghostsArray = entitiesLocation.ghost.map(([x, y, direction]) => ({
      x, y, direction,
    }));


    const entitiesName = Object.keys(entitiesLocation);

    entitiesName.map(entityName => entityApplier(
      gridState,
      entitiesLocation[entityName],
      entityToCode(entityName),
    ));

    this.setState({ gridState, ghosts: ghostsArray });
  }

  startGame = () => {
    const { config } = this.state;
    this.animationHandler = setInterval(
      this.animateGame,
      config.refreshRate,
    );
    document.addEventListener('keydown', this.setDirection);
  };

  moveGhosts = () => {
    const { ghosts } = this.state;
    const ghostUpdated = ghosts.map(({ x, y }) => {
      const { gridState } = this.state;
      const newLocation = getRandomAdjacentAvailableCell(gridState, { x, y });

      gridState[x][y] = entityToCode('free');
      gridState[newLocation.x][newLocation.y] = entityToCode('ghost');

      this.setState({
        gridState,
      });
      return newLocation;
    });
    this.setState({
      ghosts: ghostUpdated,
    });
  }

  setGameStatus = (status) => {
    if (status === 'finish') {
      clearInterval(this.animationHandler);
      this.setState({ status: 2 });
    }
  }

  getGridwithWeights = (grid) => {
    const gridwithWeights = grid.map((array) => {
      const newArray = array.map((element) => {
        let weight = element;
        if (weight === 4) {
          weight = 1;
        }
        if (weight !== 1) {
          weight = 0;
        }
        return weight;
      });
      return newArray;
    });
    return gridwithWeights;
  };

  moveBlinky = () => {
    const { blinky, gridState, pacman } = this.state;
    const { x1, y1 } = blinky;
    const { x, y } = pacman;
    const gridwithWeights = this.getGridwithWeights(gridState);
    const graph = new pathfinding.Grid(gridwithWeights);
    const finder = new pathfinding.AStarFinder();
    const path = finder.findPath(x1, y1, x, y, graph);
    const gridChange = (position) => {
      gridState[position[0]][position[1]] = entityToCode('blinky');
      this.setState({
        gridState,
        blinky: {
          x1: position[0],
          y1: position[1],
        },
      });
    };
    path.forEach((position) => {
      setInterval(() => gridChange(position), 50);
    });
    gridState[x1][y1] = entityToCode('free');
    gridState[path[0][0]][path[0][1]] = entityToCode('blinky');
    const newBlinky = {
      x1: path[0][0],
      y1: path[0][1],
    };
    this.setState({
      gridState,
      blinky: newBlinky,
    });
  };

  animateGame = () => {
    try {
      this.moveGhosts();
      const {
        gridState, pacman, pacman: { x, y, direction },
      } = this.state;
      let { score } = this.state;
      const newLocation = { x, y };

      if (direction === 'RIGHT') {
        newLocation.x = x + 1;
      } else if (direction === 'LEFT') {
        newLocation.x = x - 1;
      } else if (direction === 'UP') {
        newLocation.y = y - 1;
      } else if (direction === 'DOWN') {
        newLocation.y = y + 1;
      }
      if (!isWall(gridState, newLocation)) {
        const entityInCell = codeToEntity(gridState[newLocation.x][newLocation.y]);

        if (entityInCell === 'food') {
          score += 1;
        } else if (entityInCell === 'ghost') {
          this.setGameStatus('finish');
        }

        gridState[x][y] = entityToCode('free');
        gridState[newLocation.x][newLocation.y] = entityToCode('pacman');
        this.setState({
          gridState,
          score,
          pacman: { ...pacman, ...newLocation },
        });
      }
    } catch (e) {
      clearInterval(this.animationHandler);
    }
  }

  setDirection = ({ which: keycode }) => {
    const { pacman } = this.state;
    let newDirection;
    if (keycode === 37) newDirection = 'LEFT';
    if (keycode === 38) newDirection = 'UP';
    if (keycode === 39) newDirection = 'RIGHT';
    if (keycode === 40) newDirection = 'DOWN';

    if (newDirection) {
      this.setState({
        pacman: { ...pacman, direction: newDirection },
      });
    }
  }


  render() {
    const { width: canvasWidth, numberofCells: cellsInEachRow } = this.props;
    const gridSize = canvasWidth / cellsInEachRow;
    const {
      gridState, pacman, score, status,
    } = this.state;
    return (
      <GamePage
        startGame={this.startGame}
        score={score}
        status={status}
        render={() => (
          <PacmanBoard
            gridSize={gridSize}
            gridState={gridState}
            pacman={pacman}
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
