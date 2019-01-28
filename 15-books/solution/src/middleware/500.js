'use strict';

module.exports = (error,request,response,next) => {
  response.status(500).render('pages/error', {error: error});
};
