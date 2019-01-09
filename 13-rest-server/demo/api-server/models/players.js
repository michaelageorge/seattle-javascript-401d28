'use strict';

const playersModel = require('./players-schema.js');

class Players {
  
  constructor() {}
  
  get(_id) {
    let queryObject = _id ? {_id} : {};
    return playersModel.find(queryObject);  
  }
  
  post(record) {
    let newRecord = new playersModel(record); 
    return newRecord.save();
  }
  
  put(id,entry) {
    
  }
  
  delete(id) {
    
  }
  
}

module.exports = Players;