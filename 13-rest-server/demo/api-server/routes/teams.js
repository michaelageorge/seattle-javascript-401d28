'use strict';

const express = require('express');

const router = express.Router();

const Teams = require('../models/teams.js');

let teams = new Teams();

// Route Definitions
router.get('/api/v1/teams', getTeams);
router.post('/api/v1/teams', postTeams);

router.get('/api/v1/teams/:id', getTeam);
router.delete('/api/v1/teams/:id', deleteTeam);
router.put('/api/v1/teams/:id', putTeam);

// Route Handlers
function getTeams(req,res,next) {
  teams.get()
    .then(results => {
      let count = results.length;
      res.json({count,results});
    });
}

function getTeam(req,res,next) {
  let results = teams.get(req.params.id);
  res.json(results[0]);
}

function postTeams(req,res,next) {
  let record = teams.post(req.body);
  if(record) { res.json(record); }
  else { next('Invalid Input'); }
}

function putTeam(req,res,next) {
}

function deleteTeam(req,res,next) {

}

module.exports = router;
