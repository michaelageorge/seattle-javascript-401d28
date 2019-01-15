'use strict';

const Node = require('./node.js');

class Tree {
  
  constructor() {
    this.root = null;
  }
  
  preOrder() {
    
    let nodes = [];
    
    let _walk = (node) => {
      nodes.push(node.value);
      if(node.left) { _walk(node.left); }
      if(node.right) { _walk(node.right); }
    };
    
    _walk(this.root);
    
    return nodes;
    
  }

  inOrder() {

    let nodes = [];

    let _walk = (node) => {
      if(node.left) { _walk(node.left); }
      nodes.push(node.value);
      if(node.right) { _walk(node.right); }
    };

    _walk(this.root);

    return nodes;

  }
  
  
}


let tree = new Tree();
let a = new Node('a');
let b = new Node('b');
let c = new Node('c');
let d = new Node('d');
let e = new Node('e');
let f = new Node('f');
a.left = b;
a.right = c;
c.left = f;
b.left = d;
b.right = e;
tree.root = a;

console.log(tree.preOrder());
console.log(tree.inOrder());
