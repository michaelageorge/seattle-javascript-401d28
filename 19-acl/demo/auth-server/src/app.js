'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const errorHandler = require('./middleware/500.js');
const notFoundHandler = require('./middleware/404.js');
const authRouter = require('./auth/router.js');

// Create the server
const app = express();

// App Level Middleware
app.use(cors());
// app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use(authRouter);

const mw = (words) => (req,res,next) => {
  req.words = words;
  next();
};

app.get('/hi', mw('hello world'), (req,res,next) => {
  res.status(200).send(req.words);
});

app.get('/test', mw('testing 1,2,3'), (req,res,next) => {
  res.status(200).send(req.words);
});

// catchalls
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => console.log('app up on', port));
  },
};








