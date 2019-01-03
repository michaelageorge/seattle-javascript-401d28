'use strict';

const socketPool = require('../lib/socket-pool.js');
const events = require('../lib/events.js');

let kickUser = (data, userId) => {

  for( let connection in socketPool ) {
    let user = socketPool[connection];
    if ( user.nickname === data.target ) {
      socketPool.remove(user.id);
      events.emit('@system', `${user.nickname} has been kicked out of the chatroom by ${socketPool[userId].nickname}\n` );
    }
  }

};

events.on('@kick', kickUser);

module.exports = {};