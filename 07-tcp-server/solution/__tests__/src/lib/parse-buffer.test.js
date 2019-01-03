'use strict';

let parseBuffer = require('../../../src/lib/parse-buffer.js');

describe('parse-buffer Module', () => {

  it('parseBuffer() expects a buffer', () => {
    let badBuffers = [null, 1, 'foo', true, [], {}];
    for(let badBuffer of badBuffers) {
      let parsed = parseBuffer(badBuffer);
      expect(parsed).toBeNull();
    }
  });

  it('parseBuffer() returns null, given a bad command', () => {
    let buffer = Buffer.from("foobar");
    let parsed = parseBuffer(buffer);
    expect(parsed).toBeNull();
  });

  it('parseBuffer() returns an object, given a correct command', () => {
    let buffer = Buffer.from("@dm foobar");
    let parsed = parseBuffer(buffer);
    expect(typeof parsed).toEqual("object");
  });

  it('parseBuffer() creates a proper object', () => {
    let buffer = Buffer.from("@cmd user foobar");
    let parsed = parseBuffer(buffer);
    expect(parsed.command).toEqual('@cmd');
    expect(parsed.target).toEqual('user');
    expect(parsed.message).toEqual('foobar');
    expect(parsed.payload).toEqual('user foobar');
  });

});