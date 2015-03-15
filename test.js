

var c, Console = require('../console-ultimate');

c = Console();

c.log('a', 'b', 'c');
c.log('%s/%s', 'b', 1);

c.info('a', 'b', 'c');
c.info('%s/%s', 'b', 1);

c.warn('a', 'b', 'c');
c.warn('%s/%s', 'b', 1);

c.error('a', 'b', 'c');
c.error('%s/%s', 'b', 1);

var tree = { x: 1, y: 2, 3: { 3: { 3: 'tree' }}};

console.log('');
console.log('depth: 0');
c.dir(tree, 0);
console.log('');

console.log('depth: 1');
c.dir(tree, 1);
console.log('');

console.log('depth: default');
c.dir(tree);
console.log('');

console.log('nocolors');
c.dir(tree, 'nocolors');
console.log('');

console.log('std options');
c.dir(tree, { depth: 0, colors: true, showHidden: true });
console.log('');
