import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
} from './gameCore';
import PacmanBoard from './PacmanBoard';
import ScoreCard from '../UI/ScoreCard';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '96%',
  },
});

class PacmanGame extends Component {
  state = {
    pacman: {
      x: 1,
      y: 5,
      direction: 'RIGHT',
    },
    ghosts: [
      {
        direction: 'RIGHT',
        x: 19,
        y: 1
      },
      {
        direction: 'UP',
        x: 1,
        y: 19
      },
      {
        direction: 'DOWN',
        x: 23,
        y: 5
      },
      {
        direction: 'LEFT',
        x: 23,
        y: 23
      }
    ],
    score: 0,
    status: 0, // 0 - Not-started, 1 - Progress, 2 - Finished, 3 - Paused
    gridState: [],
    config: {
      refreshRate: 50
    }
  }
  setInitialGameState = () => {
    const { width: canvasWidth, numberofCells: cellsInEachRow } = this.props;
    const gridSize = canvasWidth / cellsInEachRow;
    const gridState = initSquareGridState(cellsInEachRow);

    const entitiesLocation = {
      food: getFoods(),
      pacman: getPacman(),
      wall: getWalls(cellsInEachRow),
      ghost: getGhosts(),
      energizer: getEnergizers(),
    };

    const entitiesName = Object.keys(entitiesLocation);

    entitiesName.map(entityName => entityApplier(
      gridState,
      entitiesLocation[entityName],
      entityToCode(entityName),
    ));

    this.setState({ gridState, gridSize });
  }
  startGame = () => {
    const { config } = this.state;
    this.animationHandler = setInterval(
      this.animateGame,
      config.refreshRate,
    );
    document.addEventListener('keydown', this.setDirection);
  };

  checkCollision = ({ x, y }) => {
    const { gridState } = this.state;
    return Boolean(gridState[x][y] === entityToCode('wall'));
  }
  moveGhosts = () => {
    const { ghosts } = this.state;
    const ghostUpdated = ghosts.map(({ x, y, direction }) => {
      const availableBlocks = [];
      switch (direction) {
        case 'RIGHT':
          availableBlocks.push(
            { x: x + 1, y, direction: 'RIGHT' },
            { x, y: y - 1, direction: 'UP' },
            { x, y: y + 1, direction: 'DOWN' }
          );
          break;
        case 'LEFT':
          availableBlocks.push(
            { x: x - 1, y, direction: 'LEFT' },
            { x, y: y - 1, direction: 'UP' },
            { x, y: y + 1, direction: 'DOWN' }
          );
          break;
        case 'UP':
          availableBlocks.push(
            { x, y: y + 1, direction: 'UP' },
            { x: x - 1, y, direction: 'LEFT' },
            { x: x + 1, y, direction: 'RIGHT' }
          );
          break;
        case 'DOWN':
          availableBlocks.push(
            { x, y: y - 1, direction: 'DOWN' },
            { x: x - 1, y, direction: 'LEFT' },
            { x: x + 1, y, direction: 'RIGHT' }
          );
          break;
      }
      const possibleBlocks = availableBlocks.reduce((acc, block) => {
        if (this.checkCollision(block)) {
          return acc;
        }
        return [...acc, block];
      }, []);
      const randomBlockIndex = Math.floor((Math.random() * 10) % possibleBlocks.length);
      const newLocation = possibleBlocks[randomBlockIndex];
      const { gridState } = this.state;
      gridState[x][y] = entityToCode('free');
      gridState[newLocation.x][newLocation.y] = entityToCode('ghost');
      this.setState({
        gridState
      });
      return newLocation;
    });
    this.setState({
      ghosts: ghostUpdated
    });
  }

  setGameStatus = (status) => {
    if (status === 'finish') {
      clearInterval(this.animationHandler);
      this.setState({ status: 2 });
    }
  }
  animateGame = () => {
    try {
      this.moveGhosts();
      const { x, y, direction } = this.state.pacman;
      const newLocation = { x, y };

      if (direction === 'RIGHT') {
        newLocation['x'] = x + 1;
      } else if (direction === 'LEFT') {
        newLocation['x'] = x - 1;
      } else if (direction === 'UP') {
        newLocation['y'] = y - 1;
      } else if (direction === 'DOWN') {
        newLocation['y'] = y + 1;
      }
      if (!this.checkCollision(newLocation)) {
        let { gridState, score } = this.state;
        const entityInCell = codeToEntity(gridState[newLocation.x][newLocation.y]);

        if (entityInCell === 'food') {
          score++;
        } else if (entityInCell === 'ghost') {
          this.setGameStatus('finish');
        }

        gridState[x][y] = entityToCode('free');
        gridState[newLocation.x][newLocation.y] = entityToCode('pacman');
        this.setState({
          gridState,
          score,
          pacman: { ...this.state.pacman, ...newLocation }
        });
      }
    } catch (e) {
      console.log(e);
      clearInterval(this.animationHandler);
    }
  }

  setDirection = ({ which: keycode }) => {
    let newDirection;
    if (keycode === 37) newDirection = 'LEFT';
    if (keycode === 38) newDirection = 'UP';
    if (keycode === 39) newDirection = 'RIGHT';
    if (keycode === 40) newDirection = 'DOWN';

    if (newDirection) {
      this.setState({
        pacman: { ...this.state.pacman, direction: newDirection }
      });
    }
  }
  componentDidMount() {
    this.setInitialGameState();
  }
  render() {
    const { gridSize, gridState, pacman, score, status } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Paper className={classes.root} elevation={1}>
          <Grid container spacing={16}>
            <Grid item xs={3} />
            <Grid item xs={6}>
            <Button variant="outlined" size="medium" color="primary" onClick={this.startGame}>
            Start
            </Button>
              <div>
          Score: {score}
        </div>
        <div>
          Status: {status === 2 ? 'GAME OVER' : status}
        </div>
              <PacmanBoard
                gridSize={gridSize}
                gridState={gridState}
                pacman={pacman}
              />
            </Grid>
            <Grid item xs={3} sm container>
              <ScoreCard />
            </Grid>
          </Grid>
        </Paper>
      </React.Fragment>
    );
  }
}

PacmanGame.propTypes = {
  width: PropTypes.number.isRequired,
  numberofCells: PropTypes.number.isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(PacmanGame);
