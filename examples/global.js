


var Console = require('../');

console.log('ultimate?: %s', console instanceof Console);
console.log('patching…');

require('../global').replace();

console.log('ultimate?: %s', console instanceof Console);
