'use strict';

class Model {

  constructor(schema) {
    this.schema = schema;
    this.database = [];
  }

  sanitize(entry) {

    let valid = true;
    let record = {};

    Object.keys(this.schema).forEach( field => {
      if ( this.schema[field].required ) {
        if (entry[field]) {
          record[field] = entry[field];
        } else {
          valid = false;
        }
      }
      else {
        record[field] = entry[field];
      }
    });
    
    console.log(this.schema);
    console.log({valid,record,entry});

    return valid ? record : undefined;
  }
  
  count() {
    return this.database.length;
  }

  addOne(entry) {
    entry.id = this.count() + 1;
    let record = this.sanitize(entry);
    if ( record.id ) { this.database.push(record); }
    return record;
  }
  
  find() {
    return this.database;
  }
  
  findOne(id) {
    return this.database.filter( (record) => record.id === id );
  }
  
  findOneAndDelete(id) {
    this.database = this.database.filter((record) => record.id !== id );
    return this.findOne(id);
  }

  findOneAndUpdate(id, entry) {
    let record = this.sanitize(entry);
    if( record.id ) { this.database = this.database.map((item) => (item.id === id) ? record : item  ); }
    return this.findOne(id);
  }
  
}

module.exports = Model;