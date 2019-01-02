'use strict';

// force jest to use the "mock" version of socket-pool
// Now, when anything "requires" it, it will load the fake version instead
// this is our pretend implementation of that module for testing
// In it, we set up some fake data, and put some spies on its internal methods.
jest.mock('../../../src/lib/socket-pool.js');

// The module under test
const dm = require('../../../src/actions/dm.js');

// Requiring in socket-pool module (we will get the mocked one!)
// Why? We need to inspect some of the methods and data directly, and
// the module under test doesn't expose that to us, so we can just pull
// it in and are able to test it out.
const socketPool = require('../../../src/lib/socket-pool.js');

describe('@dm action', () => {

  it('sends nothing if the target user is not valide', () => {
    let commandObject = {
      command:'@dm',
      target:'nobody',
      message:'Hello'
    };
    dm(commandObject, 1);
    expect(socketPool.write).not.toHaveBeenCalled();
  });

  it('sends a message to a valid user', () => {
    let commandObject = {
      command:'@dm',
      target:'two',
      message:'Hello'
    };
    dm(commandObject, 1);
    expect(socketPool.write).toHaveBeenCalled();
  });

});