'use strict';
const util = require('util');

class Hashmap {

  constructor(size) {
    this.size = size;
    this.map = new Array(size);
  }

  hash(key) {
    return key.split('').reduce((p, n) => p + n.charCodeAt(0), 0) % this.size;
  }

  set(key,value) {
    let hash = this.hash(key);
    console.log(hash, key, value);

    // Please use a LL instead of an array!
    if(! this.map[hash] ) { this.map[hash] = []; }

    // We used an object here, but this could be anything...
    this.map[hash].push({[key]:value});
  }

  /**
   * Find a key in the hashmap and return its value
   * @param key
   * @return {string}
   */
  get(key) {

  }

  /**
   * Delete a key from the map
   * @param key
   */
  delete(key) {

  }

  /**
   * Replace a value for a key in a hashmap
   * @param key
   * @param newValue
   */
  update(key,newValue) {

  }

  serialize() {

  }

  deserialize() {

  }

}

let myhash = new Hashmap(14);
myhash.set('John','Boss');
myhash.set('Cathy','The Real Boss');
myhash.set('Zach','Kid 1');
myhash.set('Allie','Kid 2');
myhash.set('Rosie','Dog');
myhash.set('Cat','TA');
myhash.set('Justin','Student');
myhash.set('Jason','Student');
myhash.set('Ben','Student');
myhash.set('Timea','Student');
myhash.set('Jen','Student');
myhash.set('Khalil','Student');
myhash.set('Michael','Student');
myhash.set('Ovi','Student');

console.log(util.inspect(myhash,{showHidden:false,depth:null}));
