'use strict';

const express = require('express');

const methodOverride = require('./middleware/method-override.js');
const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');

const DB = process.env.DB || 'pg';
const bookApp = require(`./routes/book-app-${DB}.js`);

// Application Setup & Exports
const app = express();
const server = {
  start: (port=process.env.PORT) => app.listen(port, () => console.log("Server Up On", port))
};
module.exports = {app,server};

// Set the view engine for server-side templating
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

// Application Middleware
app.use(express.urlencoded({extended:true}));
app.use(methodOverride);
app.use(express.static('public'));

// Routes
app.use(bookApp);

// Fallback Routes
app.get('*', notFoundHandler);
app.use(errorHandler);

