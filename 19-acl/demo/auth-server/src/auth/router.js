'use strict';

const express = require('express');
const User = require('./users-model.js');
const auth = require('./middleware.js');
const oauth = require('./oauth/google.js');

const authRouter = express.Router();

authRouter.post('/signup', (req,res,next) => {
  let user = new User(req.body);
  user.save()
    .then( account => {
      User.findOne({_id:account._id})
        .then(user => {
          let token = user.generateToken();
          res.status(200).send(token);
        });
    })
    .catch(next);
});

// Creater user
// Login with basic (post /signup)
// Get token from req.text
// Login with that token (post /signup)
//
authRouter.post('/signin', auth(), (req,res,next) => {
  res.status(200).send(req.token);
});

authRouter.post('/secret', auth('read'), (req,res,next) => {
  res.status(200).send(req.token);
});

authRouter.get('/oauth', (req,res,next) => {
  oauth(req)
    .then(token => {
      res.status(200).send(token);
    })
    .catch(next);
});

module.exports = authRouter;