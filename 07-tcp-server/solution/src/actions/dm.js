'use strict';

const socketPool = require('../lib/socket-pool.js');
const events = require('../lib/events.js');

let dmUser = (data, userId) => {

  for( let connection in socketPool ) {
    let user = socketPool[connection];
    if ( user.nickname === data.target ) {
      user.socket.write(`    <<<${socketPool[userId].nickname}>>> ${data.message}\n`)
    }
  }

};

events.on('@dm', dmUser);

module.exports = dmUser;