'use strict';

const Node = require('../node.js');
const Tree = require('../binary-tree.js');

let tree, a, b, c, d, e, f;

beforeAll( () => {
  tree = new Tree();
  a = new Node('a');
  b = new Node('b');
  c = new Node('c');
  d = new Node('d');
  e = new Node('e');
  f = new Node('f'); 
  a.left = b;
  a.right = c;
  c.left = f;
  b.left = d;
  b.right = e;
  tree.root = a;
});

describe('binary tree', () => {
  it('pre-order visits nodes in the correct order', () => {
    let expected = ['a', 'b', 'd', 'e', 'c', 'f'];
    expect(tree.preOrder()).toEqual(expected);
  });

  it('in-order visits nodes in the correct order', () => {
    let expected = ['d', 'b', 'e', 'a', 'f', 'c'];
    expect(tree.inOrder()).toEqual(expected);
  });

  it('post-order visits nodes in the correct order', () => {
    let expected = ['d', 'e', 'b', 'f', 'c', 'a'];
    expect(tree.postOrder()).toEqual(expected);
  });

  it('breadth first visits nodes in the correct order', () => {
    let expected = ['a', 'b', 'c', 'd', 'e', 'f'];
    expect(tree.breadthFirst()).toEqual(expected);
  });
  
});
