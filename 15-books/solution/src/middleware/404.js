'use strict';

module.exports = (request,response,next) => {
  response.status(404).send('This route does not exist');
};