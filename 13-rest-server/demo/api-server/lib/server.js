'use strict';

const express = require('express');
const postsRouter = require('./api/posts.js');
const carsRouter = require('./api/cars.js');
const notFound = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use( postsRouter );
app.use( carsRouter );
app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};

