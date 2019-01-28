'use strict';

const mongoose = require('mongoose');

const bookshelves = mongoose.Schema({
  bookshelf: { type:String, required:true },
});

module.exports = mongoose.model('bookshelves', bookshelves);
