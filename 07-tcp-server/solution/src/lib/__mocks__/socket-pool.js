'use strict';

const socket = {
  write: () => socketPool.write(),
};

const socketPool = {
  1: { id: 1, nickname:'one', socket:socket },
  2: { id: 2, nickname:'two', socket:socket },
  3: { id: 3, nickname:'three', socket:socket },
  4: { id: 4, nickname:'four', socket:socket },
};

// This is going to be called whenever a socket does a "write"
// Its been set up as a jest "spy" so that we can run
// tests later on on if this has been called
socketPool.write = jest.fn();

socketPool.remove = (id) => {
  if( ! socketPool[id] && socketPool[id].socket ) { return; }
  delete socketPool[id];
};

module.exports = socketPool;
