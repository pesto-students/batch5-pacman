const pathfinding = require('pathfinding');
const { entityToCode } = require('./constants');

const getGridwithWeights = (grid) => {
  const gridwithWeights = grid.map((array) => {
    const newArray = array.map((element) => {
      if (element !== entityToCode('wall')) return 0;
      return 1;
    });
    return newArray;
  });
  return gridwithWeights;
};

const chaseLocation = (gridwithWeights, currentGhostLocation, targetGhostLocation) => {
  const { x, y } = currentGhostLocation;
  const graph = new pathfinding.Grid(gridwithWeights);
  const finder = new pathfinding.AStarFinder();
  const path = finder.findPath(x, y, targetGhostLocation.x, targetGhostLocation.y, graph);
  return path;
};

module.exports = { getGridwithWeights, chaseLocation };
