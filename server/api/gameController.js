const createRoom = (playerInfo) => {
  const roomId = (Math.random() * 100000000000).toFixed(0);
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
