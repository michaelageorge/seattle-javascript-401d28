'use strict';

const Node = require('./node.js');
const Tree = require('./binary-tree.js');

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

