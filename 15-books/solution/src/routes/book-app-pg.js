'use strict';

const superagent = require('superagent');
const express = require('express');
const router = express.Router();

// Would love for this to be somewhere else ...
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

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
  this.id = info.industryIdentifiers ? `${info.industryIdentifiers[0].identifier}` : '';
}

function getBooks(request, response,next) {
  let SQL = 'SELECT * FROM books;';

  return client.query(SQL)
    .then(results => {
      if(results.rows.rowCount === 0) {
        response.render('pages/searches/new');
      } else {
        response.render('pages/index', {books: results.rows})
      }
    })
    .catch(next)
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

function newSearch(request, response) {
  response.render('pages/searches/new');
}

function getBook(request, response,next) {
  getBookshelves()
    .then(shelves => {
      let SQL = 'SELECT books.*, bookshelves.name FROM books INNER JOIN bookshelves on books.bookshelf_id=bookshelves.id WHERE books.id=$1;';
      let values = [request.params.id];
      client.query(SQL, values)
        .then(result => response.render('pages/books/show', {book: result.rows[0], bookshelves: shelves.rows}))
        .catch(next)
    })
}

function getBookshelves() {
  let SQL = 'SELECT * FROM bookshelves ORDER BY name;';

  return client.query(SQL);
}

function createShelf(shelf) {
  let normalizedShelf = shelf.toLowerCase();
  let SQL1 = `SELECT id from bookshelves where name=$1;`;
  let values1 = [normalizedShelf];

  return client.query(SQL1, values1)
    .then(results => {
      if(results.rowCount) {
        return results.rows[0].id;
      } else {
        let INSERT = `INSERT INTO bookshelves(name) VALUES($1) RETURNING id;`;
        let insertValues = [shelf];

        return client.query(INSERT, insertValues)
          .then(results => {
            return results.rows[0].id;
          })
      }
    })
}

function createBook(request, response,next) {
  createShelf(request.body.bookshelf)
    .then(id => {
      let {title, author, isbn, image_url, description} = request.body;
      let SQL = 'INSERT INTO books(title, author, isbn, image_url, description, bookshelf_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING id;';
      let values = [title, author, isbn, image_url, description, id];

      client.query(SQL, values)
        .then(result => response.redirect(`/books/${result.rows[0].id}`))
        .catch(next)
    })

}

function updateBook(request, response,next) {
  let {title, author, isbn, image_url, description, bookshelf_id} = request.body;
  let SQL = `UPDATE books SET title=$1, author=$2, isbn=$3, image_url=$4, description=$5, bookshelf_id=$6 WHERE id=$7;`;
  let values = [title, author, isbn, image_url, description, bookshelf_id, request.params.id];

  client.query(SQL, values)
    .then(response.redirect(`/books/${request.params.id}`))
    .catch(next)
}

function deleteBook(request, response,next) {
  let SQL = 'DELETE FROM books WHERE id=$1;';
  let values = [request.params.id];

  return client.query(SQL, values)
    .then(response.redirect('/'))
    .catch(next)
}

module.exports = router;
