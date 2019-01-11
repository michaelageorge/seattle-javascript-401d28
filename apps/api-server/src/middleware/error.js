'use strict';

/**
 * Error Handler (500) Middleware
 * @param {object} req - Express Request Object
 * @param {object} res - Express Response Object
 * @param {function} next - Express next Function
 */
module.exports = (err, req, res, next) => {
  let error = { error: err };
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(error) );
  res.end();
};