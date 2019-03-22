const uuidv1 = require('uuid/v1');

const createRoom = (playerInfo) => {
  const roomId = uuidv1();
  const pacmanOne = playerInfo;
  const pacmanTwo = {};
  const freeToJoin = true;
  return {
    roomId,
    pacmanOne,
    pacmanTwo,
    freeToJoin,
  };
};

module.exports = createRoom;
