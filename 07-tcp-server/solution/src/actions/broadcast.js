'use strict';

const socketPool = require('../lib/socket-pool.js');
const events = require('../lib/events.js');

let sendMessage = (data, userId) => {
  for( let connection in socketPool ) {
    let user = socketPool[connection];
    user.socket && user.socket.write(`<${socketPool[userId].nickname}>: ${data.payload}\n`);
  }
};

let systemMessage = (message) => {
  for( let connection in socketPool ) {
    let user = socketPool[connection];
    user.socket && user.socket.write(`<system>: ${message}\n`);
  }
};

events.on('@all', sendMessage);
events.on('@system', systemMessage);
