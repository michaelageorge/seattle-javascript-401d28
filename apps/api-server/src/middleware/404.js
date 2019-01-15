'use strict';
/**
 * 404 Middleware
 * @module 404.js
 * @param {object} req - Express Request Object
 * @param {object} res - Express Response Object
 * @param {function} next - Express next Function
 */
module.exports = (req,res,next) => {
  let error = { error: 'Resource Not Found' };
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};