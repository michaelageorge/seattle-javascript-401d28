'use strict';

// First Party Modules
const net = require('net');

// Third Party Modules
let requireDir = require('require-dir');

// Local Modules
const User = require('./models/user.js');
const socketPool = require('./lib/socket-pool.js');
const events = require('./lib/events.js');
const parseBuffer = require('./lib/parse-buffer.js');
requireDir('./actions/');

const port = process.env.PORT || 3001;
const server = net.createServer();

let handleConnection = (socket) => {
  let user = new User(socket);
  socketPool.add(user);
  socket.on('data', (buffer) => dispatchAction(user.id, buffer));
};

let dispatchAction = (userId, buffer) => {
  let entry = parseBuffer(buffer);
  entry && events.emit(entry.command, entry, userId);
};

let startServer = () => {
  server.listen(port, () => {
    console.log(`Chat Server up on ${port}`);
  });
};

server.on('connection', handleConnection);

module.exports = {startServer};
