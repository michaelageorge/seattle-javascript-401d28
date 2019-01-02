'use strict';

const socketPool = require('../lib/socket-pool.js');
const events = require('../lib/events.js');

let leaveChatroom = (data, userId) => {
  let nickname = socketPool[userId].nickname;
  socketPool.remove(userId);
  events.emit('@system', `${nickname} has left the chatroom\n` );
};

events.on('@quit', leaveChatroom);

module.exports = {};