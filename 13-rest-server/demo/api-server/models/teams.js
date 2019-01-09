'use strict';

const uuid = require('uuid/v4');

const schema = {
  id: {required:true},
  name: {required:true},
};

class Team {
  
  constructor() {
    this.database = [];  
  }
  
  get(id) {
    let response = id ? this.database.filter( record => record.id === id ) : this.database;
    return Promise.resolve(response);
    // return response;
  }
  
  post(entry) {
    entry.id = uuid();
    let record = this.sanitize(entry);
    if( record.id ) { this.database.push(record); }
    return record;
  }
  
  put(id, entry) {
    
  }
  
  delete(id) {
    
  }
  
  sanitize(data) {
    
    let valid = true;
    let record = {};
    
    for(let key in schema) {
      if( schema[key].required ) {
        if(data[key])  { 
          record[key] = data[key];
        }
        else {
          valid = false;
        }
      } 
      else {
        record[key] = data[key];
      }
    }
    
    return valid ? record : undefined;
  }
  
  
}

module.exports = Team;