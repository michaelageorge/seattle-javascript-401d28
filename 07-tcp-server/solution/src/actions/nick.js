'use strict';

const socketPool = require('../lib/socket-pool.js');
const events = require('../lib/events.js');

let changeNickname = (data, userId) => {
  socketPool[userId].nickname = data.target;
};

events.on('@nick', changeNickname);

module.exports = {};
