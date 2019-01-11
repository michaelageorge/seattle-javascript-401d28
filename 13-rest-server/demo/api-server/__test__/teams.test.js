'use strict';

let Teams = require('../models/teams.js');

describe('Teams', () => {
  
  it('can post()', () => {
    let teams = new Teams();
    let obj = {name:'Mariners'};
    let record = teams.post(obj);
    expect(record.name).toEqual(obj.name);
  });
  
});