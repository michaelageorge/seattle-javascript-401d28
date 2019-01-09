'use strict';

const Model = require('./model.js');

const schema = {
  id: {required:true},
  author: {required:true},
  title: {required:true},
  article: {},
};

class Posts extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Posts;