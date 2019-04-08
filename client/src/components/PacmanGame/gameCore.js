import { entityToCode, directionValues } from './constants';

export const isWall = (gridState, { x, y }) => Boolean(gridState[x][y] === entityToCode('wall'));

export const moveInDirection = ({ x, y, direction }) => {
  const newLocation = {
    x: x + directionValues[direction].x,
    y: y + directionValues[direction].y,
  };
  return newLocation;
};

export const locationOnCanvas = ({
  gridX, gridY, gridSize, centerEntity = false,
}) => {
  const canvasPos = gridPostion => gridPostion * gridSize;
  const [x, y] = [gridX, gridY]
    .map(value => (centerEntity ? canvasPos(value + 0.5) : canvasPos(value)));
  return { x, y };
};

const isAnObject = value => typeof value === 'object' && value !== null;
const isEmptyObject = obj => isAnObject(obj) && Object.keys(obj).length === 0;

const stripEmptyObjValues = obj => Object.keys(obj).reduce((acc, key) => {
  if (isEmptyObject(obj[key])) {
    return acc;
  }
  return {
    ...acc,
    [key]: obj[key],
  };
}, {});

export const getObjectDiffs = ({ oldObj, newObj }) => {
  const diffWithEmptyObjAsValue = Object.keys(newObj).reduce((acc, key) => {
    if (isAnObject(oldObj[key]) && isAnObject(newObj[key])) {
      return {
        ...acc,
        [key]: getObjectDiffs({
          oldObj: oldObj[key],
          newObj: newObj[key],
        }),
      };
    }

    const noDiffInValue = oldObj[key] === newObj[key];

    return noDiffInValue ? acc : {
      ...acc,
      [key]: newObj[key],
    };
  }, {});

  return stripEmptyObjValues(diffWithEmptyObjAsValue);
};

export const makeSquareImgWithSrc = ({ src, size }) => {
  const image = new window.Image(size, size);
  image.src = src;
  return image;
};

export const predictPacmanMove = ({ pacman, gridState }) => {
  const { x, y, direction } = pacman;

  let newLocation = moveInDirection({ x, y, direction });

  newLocation = isWall(gridState, newLocation) ? {} : moveInDirection({ x, y, direction });
  return {
    pacmanUpdated: { ...pacman, ...newLocation },
  };
};

export const predictFoodEat = ({ pacmanUpdated, gridState }) => {
  const gridStateAfterEating = gridState;
  gridStateAfterEating[pacmanUpdated.x][pacmanUpdated.y] = entityToCode('free');
  return { gridStateAfterEating };
};
