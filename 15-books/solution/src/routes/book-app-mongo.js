'use strict';

const superagent = require('superagent');
const express = require('express');
const router = express.Router();
const books = require('../models/books.js');
const bookshelves = require('../models/bookshelves.js');

// Would love for this to be somewhere else ...
const mongoose = require('mongoose');
const mongooseOptions = {
  useNewUrlParser:true,
  useCreateIndex: true,
  useFindAndModify: false
};
mongoose.connect(process.env.MONGODB_URI, mongooseOptions);

router.get('/', getBooks);
router.post('/searches', createSearch);
router.get('/searches/new', newSearch);
router.get('/books/:id', getBook);
router.post('/books', createBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

// HELPER FUNCTIONS
function Book(info) {
  let placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';
  this.title = info.title || 'No title available';
  this.author = info.authors[0] || 'No authors available';
  this.isbn = info.industryIdentifiers ? `ISBN_13 ${info.industryIdentifiers[0].identifier}` : 'No ISBN available';
  this.image_url = info.imageLinks ? info.imageLinks.smallThumbnail : placeholderImage;
  this.description = info.description || 'No description available';
}

function getBooks(request, response,next) {
  books.find({})
    .then(results => {
      if(results.length) {
        response.render('pages/index', {books: results})
      } else {
        response.render('pages/searches/new');
      }
    })
    .catch(next)
}

function getBook(request, response,next) {

  books.findById(request.params.id)
    .then(book => {
      return bookshelves.find()
        .then(shelves => response.render('pages/books/show', {book: book, bookshelves: shelves}))
    })
    .catch(next);
}


function newSearch(request, response) {
  response.render('pages/searches/new');
}

function createSearch(request, response,next) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => response.render('pages/searches/show', {results: results}))
    .catch(next)
}


function createShelf(shelf) {
  let normalizedShelf = shelf.toLowerCase();
  return bookshelves.findOneAndUpdate(
    {bookshelf: normalizedShelf},
    {bookshelf: normalizedShelf},
    {upsert: true, new: true}
  );
}

function createBook(request, response,next) {
  createShelf(request.body.bookshelf)
    .then(shelf => {
      let record = request.body;
      record.bookshelf_id = shelf._id;
      let book = new books(record);
      book.save()
        .then(result => response.redirect(`/books/${result._id}`))
        .catch(next)
    })
}

function updateBook(request, response,next) {
  books.findByIdAndUpdate(request.params.id, request.body)
    .then(response.redirect(`/books/${request.params.id}`))
    .catch(next)
}

function deleteBook(request, response,next) {
  books.findByIdAndDelete(request.params.id, request.body)
    .then(response.redirect('/'))
    .catch(next)
}

module.exports = router;
