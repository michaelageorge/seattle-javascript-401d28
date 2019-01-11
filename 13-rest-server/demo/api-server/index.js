'use strict';

const mongoose = require('mongoose');
const server = require('./lib/server.js');

const MONGO = 'mongodb://localhost:27017/baseball';
mongoose.connect(MONGO);

server.start(3000);
