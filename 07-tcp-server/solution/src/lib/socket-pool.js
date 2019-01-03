'use strict';

const socketPool = {};

socketPool.add = (user) => {
  socketPool[user.id] = user;
};

/**
 * This function does awesome stuff
 * @param UUID - id used to uniquely identify a user in the pool
 */
socketPool.remove = (id) => {
  if( ! socketPool[id] && socketPool[id].socket ) { return; }
  let socket = socketPool[id].socket;
  socket.destroy();
  delete socketPool[id];
};

module.exports = socketPool;