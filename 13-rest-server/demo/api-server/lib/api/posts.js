'use strict';

const express = require('express');

const router = express.Router();

const Posts = require('../models/posts.js');
const db = new Posts();

router.get('/posts', getAll);
router.get('/posts/:id', getOne);
router.post('/posts', addOne);
router.put('/posts/:id', replaceOne);
router.delete('/posts/:id', deleteOne);

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
  let {author,title,article} = req.body;
  let record = db.addOne({author,title,article});
  res.json(record);
}

function replaceOne(req,res,next) {
  let id = parseInt(req.params.id);
  let {author,title,article} = req.body;
  let record = {id,author,title,article};
  let updatedRecord = db.findOneAndUpdate(id, record);
  res.json(updatedRecord);
}

function deleteOne(req,res,next) {
  let id = parseInt(req.params.id);
  let result = db.findOneAndDelete(id);
  res.json(result);
}

module.exports = router;
