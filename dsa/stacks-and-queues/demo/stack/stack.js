'use strict';

class Stack {
  constructor() {
    this.stack = new Array();
    this.top = null;
  }
  
  push(value) {
    this.stack.unshift(value);
    this.top = value;
  }
  
  pop() {
    let value = this.stack.shift();
    this.top = array[0];
    return value;
  }
  
  peek() {
    return this.top;
  }
}

module.exports = Stack;