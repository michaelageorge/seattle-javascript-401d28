'use strict';

const Model = require('./model.js');

const schema = {
  id: {required:true},
  year: {required:true},
  make: {required:true},
  model: {required:true},
};

class Cars extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Cars;