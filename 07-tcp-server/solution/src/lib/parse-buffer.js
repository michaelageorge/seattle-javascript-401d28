'use strict';

/**
 * Command Parser
 * Handles commands such as:
 *    @all message
 *    @nick newname
 *    @quit
 *    @kick username
 *    @list
 *    @dm username message
 * @param buffer
 * @returns {*}
 *    format:
 *      command: the @command given
 *      payload: the full text after the @command
 *      target: the first word after the @command (might be useful for @dm, @kick)
 *      message: all of the words after "target" (only useful for @dm)
 */

module.exports = (buffer) => {
  if ( !Buffer.isBuffer(buffer) ) { return null; }
  let text = buffer.toString().trim();
  if ( !text.startsWith('@') ) { return null; }
  let [command,payload] = text.split(/\s+(.*)/);
  let [target,message] = payload ? payload.split(/\s+(.*)/) : [null,null];
  return {command,payload,target,message};
};


