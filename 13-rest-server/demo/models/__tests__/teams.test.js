const Teams = require('../teams.js');

describe('Teams Model', () => {
  it('can post() a new team', () => {
    let obj = {name:'Test Team'};
    let teams = new Teams();
    return teams.post(obj)
      .then(record => {
        Object.keys(obj).forEach(key =>{
          expect(record[0][key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e) );
  });

  it('can get() a team', () => {
    let obj = {name:'Test Team'};
    let teams = new Teams();
    return teams.post(obj)
      .then(record => {
        return teams.get(record._id)
          .then(team => {
            Object.keys(obj).forEach(key =>{
              expect(team[0][key]).toEqual(obj[key]);
            });
          });
      });
  });
  
});