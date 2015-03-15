

var c, Console = require('./src/Console');

c = Console();

c.log('a', 'b', 'c');
c.log('%s/%s', 'b', 1);

c.info('a', 'b', 'c');
c.info('%s/%s', 'b', 1);

c.warn('a', 'b', 'c');
c.warn('%s/%s', 'b', 1);

c.error('a', 'b', 'c');
c.error('%s/%s', 'b', 1);
