'use strict';

/**
 * Model Finder Middleware
 * Evaluates req.params.model (i.e. /api/v1/:model/) and returns an instance of the specified model.
 * Because node require is cached, the instance will only be created once, no matter how many times a model is called for.
 * In the event the model is not found, node will throw a "MODULE_NOT_FOUND" error which the error middleware in the server will pick up.
 * @param {object} req - Express Request Object
 * @param {object} res - Express Response Object
 * @param {function} next - Express next Function
 */
module.exports = (req,res,next) => {
  let modelName = req.params.model.replace(/[^a-z0-9-_]/gi, '');
  req.model = require(`../models/${modelName}/${modelName}-model.js`);
  next();
};
