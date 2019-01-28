'use strict';

const bookshelves = require('./bookshelves.js');
const mongoose = require('mongoose');

const books = mongoose.Schema({
  title: { type:String, required:true },
  author: { type:String, required:true },
  isbn: { type:String, required:true },
  image_url: { type:String },
  description: { type: String },
  bookshelf_id: { type: String }
}, { toObject:{virtuals:true}, toJSON:{virtuals:true} });

books.virtual('bookshelf', {
  ref: 'bookshelves',
  localField: 'bookshelf_id',
  foreignField: '_id',
  justOne:true,
});

books.pre('find', function() {
  try {
    this.populate('bookshelf');
  }
  catch(e) {
    console.error('Find Error', e);
  }
});

module.exports = mongoose.model('books', books);
