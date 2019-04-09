import PropTypes from 'prop-types';

import ghostImage1 from '../../sprites/ghosts/blinky.png';
import ghostImage2 from '../../sprites/ghosts/inky.png';
import ghostImage3 from '../../sprites/ghosts/clyde.png';
import ghostImage4 from '../../sprites/ghosts/pinky.png';
import afraidGhost from '../../sprites/ghosts/afraid.png';

import pacmanUp from '../../sprites/pacman/up.png';
import pacmanDown from '../../sprites/pacman/down.png';
import pacmanRight from '../../sprites/pacman/right.png';
import pacmanLeft from '../../sprites/pacman/left.png';

import myPacmanUp from '../../sprites/pacman/myUp.png';
import myPacmanDown from '../../sprites/pacman/myDown.png';
import myPacmanRight from '../../sprites/pacman/myRight.png';
import myPacmanLeft from '../../sprites/pacman/myLeft.png';

import predictPacmanUp from '../../sprites/pacman/predictUp.png';
import predictPacmanDown from '../../sprites/pacman/predictDown.png';
import predictPacmanRight from '../../sprites/pacman/predictRight.png';
import predictPacmanLeft from '../../sprites/pacman/predictLeft.png';

import pacmanClose from '../../sprites/pacman/close.png';

export const ghostImages = [
  ghostImage1,
  ghostImage2,
  ghostImage3,
  ghostImage4,
  afraidGhost,
];

export const pacmanImages = {
  UP: pacmanUp,
  DOWN: pacmanDown,
  RIGHT: pacmanRight,
  LEFT: pacmanLeft,
  SELF: {
    UP: myPacmanUp,
    DOWN: myPacmanDown,
    RIGHT: myPacmanRight,
    LEFT: myPacmanLeft,
  },
  PREDICT: {
    UP: predictPacmanUp,
    DOWN: predictPacmanDown,
    RIGHT: predictPacmanRight,
    LEFT: predictPacmanLeft,
  },
  CLOSE: pacmanClose,
};

export const getBoard = () => [
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
  [4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 1, 4, 1, 4, 4, 4, 1, 4, 1, 4, 4, 4, 1, 4],
  [4, 1, 1, 2, 1, 4, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 4, 1, 4, 2, 1, 1, 4],
  [4, 1, 4, 4, 1, 4, 1, 4, 4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 1, 4, 1, 4, 1, 4],
  [4, 1, 4, 4, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 4],
  [4, 1, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 1, 4, 4, 1, 4, 1, 4, 4, 4, 4, 1, 4],
  [4, 1, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 1, 4, 4, 1, 4, 1, 1, 1, 1, 4, 1, 4],
  [4, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 4, 1, 4, 4, 4, 4, 1, 4, 1, 4],
  [4, 1, 4, 4, 4, 4, 1, 4, 4, 1, 4, 4, 4, 4, 1, 4, 1, 1, 1, 1, 1, 1, 4, 1, 4],
  [4, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 4, 1, 4, 4, 4, 1, 4, 4, 1, 4],
  [4, 1, 4, 1, 4, 4, 4, 1, 4, 4, 1, 4, 1, 4, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 4],
  [4, 1, 4, 1, 1, 1, 1, 1, 4, 4, 1, 4, 1, 4, 1, 4, 4, 4, 1, 4, 1, 4, 4, 4, 4],
  [4, 1, 4, 1, 4, 4, 4, 1, 4, 4, 1, 4, 1, 4, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 4],
  [4, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 4, 1, 4, 4, 4, 1, 4, 4, 1, 4],
  [4, 1, 4, 4, 4, 4, 1, 4, 4, 1, 4, 4, 4, 4, 1, 4, 1, 1, 1, 1, 1, 1, 4, 1, 4],
  [4, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 4, 1, 4, 4, 4, 4, 1, 4, 1, 4],
  [4, 1, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 1, 4, 4, 1, 4, 1, 1, 1, 1, 4, 1, 4],
  [4, 1, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 1, 4, 4, 1, 4, 1, 4, 4, 4, 4, 1, 4],
  [4, 1, 4, 4, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 4],
  [4, 1, 4, 4, 1, 4, 1, 4, 4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 1, 4, 1, 4, 1, 4],
  [4, 1, 1, 2, 1, 4, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 4, 1, 4, 2, 1, 1, 4],
  [4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 1, 4, 1, 4, 4, 4, 1, 4, 1, 4, 4, 4, 1, 4],
  [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
];

export const boardTranspose = getBoard()[0].map((col, i) => getBoard().map(row => row[i]));

export const codeToEntity = (code) => {
  const entityMap = {
    0: 'free',
    1: 'food',
    2: 'energizer',
    3: 'ghost',
    4: 'wall',
    5: 'pacman',
  };
  return entityMap[code];
};

export const entityToCode = (entity) => {
  const entityMap = {
    free: 0,
    food: 1,
    energizer: 2,
    ghost: 3,
    wall: 4,
    pacman: 5,
  };
  return entityMap[entity];
};

export const colorCode = {
  pacman: '#FAD06C',
  food: '#38855d',
  ghost: '#BE2623',
  scatterGhost: '#CCD0D7',
  wall: '#13326D',
  energizer: '#AEE6E6',
};

export const boardCorners = [{ x: 1, y: 1 }, { x: 1, y: 23 }, { x: 23, y: 1 }, { x: 23, y: 23 }];

export const directionValues = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  RIGHT: { x: 1, y: 0 },
  LEFT: { x: -1, y: 0 },
};

export const getGhosts = () => [[13, 12, 'RIGHT'], [14, 12, 'LEFT'], [11, 12, 'DOWN'], [12, 12, 'UP']];

export const getPacman = () => [13, 14, 'RIGHT'];

export const boardEdgeInPixel = Math.min(window.innerWidth, window.innerHeight) * 0.65;

// export const advanceFrameAfterTime = 1.0 * 1000;
export const advanceFrameAfterTime = 0.50 * 1000;

export const entitiesAnimationDurationInSecond = 0.50;

export const arrowKeysDirections = {
  ArrowLeft: 'LEFT',
  ArrowUp: 'UP',
  ArrowRight: 'RIGHT',
  ArrowDown: 'DOWN',
};

export const locationIn2D = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  direction: PropTypes.string,
});
