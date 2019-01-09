'use strict';

const express = require('express');

const router = express.Router();

const Cars = require('../models/cars.js');
const db = new Cars();

router.get('/cars', getAll);
router.get('/cars/:id', getOne);
router.post('/cars', addOne);
router.put('/cars/:id', replaceOne);
router.delete('/cars/:id', deleteOne);

function getAll(req,res,next) {
  let count = db.count();
  let results = db.find();
  res.json({count,results});
}

function getOne(req,res,next) {
  let id = parseInt(req.params.id);
  let record = db.findOne(id);
  res.json(record[0]);
}

function addOne(req,res,next) {
  let {year,make,model} = req.body;
  let record = db.addOne({year,make,model});
  res.json(record);
}

function replaceOne(req,res,next) {
  let id = parseInt(req.params.id);
  let {year,make,model} = req.body;
  let record = {id,year,make,model};
  let updatedRecord = db.findOneAndUpdate(id, record);
  res.json(updatedRecord);
}

function deleteOne(req,res,next) {
  let id = parseInt(req.params.id);
  let result = db.findOneAndDelete(id);
  res.json(result);
}

module.exports = router;
