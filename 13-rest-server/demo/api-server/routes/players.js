'use strict';

const express = require('express');

const Players = require('../models/players.js');

const router = express.Router();

let players = new Players();

// Route Definitions
router.get('/api/v1/players', getPlayers);
router.post('/api/v1/players', postPlayers);

router.get('/api/v1/players/:id', getPlayer);
router.delete('/api/v1/players/:id', deletePlayer);
router.put('/api/v1/players/:id', putPlayer);

// Route Handlers
function getPlayers(req,res,next) {
  players.get()
    .then( results => {
      let count = results.length;
      res.json({count,results});
    })
    .catch(next);
}

function getPlayer(req,res,next) {
  let id = req.params.id;
  players.get(id)
    .then( records => res.json(records[0]) )
    .catch(next);
}

function postPlayers(req,res,next) {
  players.post(req.body)
    .then( result => res.json(result) )
    .catch(next);
}

function putPlayer(req,res,next) {
}

function deletePlayer(req,res,next) {
}

module.exports = router;
