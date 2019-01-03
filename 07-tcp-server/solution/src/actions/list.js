'use strict';

const socketPool = require('../lib/socket-pool.js');
const events = require('../lib/events.js');

let listUsers = (data, userId) => {
  let message = Object.keys(socketPool).reduce( (msg, userid) => {
    if(socketPool[userid].nickname) {
      msg += ` <${socketPool[userid].nickname}>\n`;
    }
    return msg;
  }, 'Logged In Users\n=======================\n');

  console.log(userId, message);
  socketPool[userId].socket.write(message);
};

events.on('@list', listUsers);

module.exports = {};