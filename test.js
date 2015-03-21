

var
	compose = require('aux.js/fn/compose'),

	Console = require('../console-ultimate'),
	colr = Console.colors;

var c = Console(null, null,
{
	styling:
	{
		colors: true,
		log:
		{
			color: colr.bold
		},
		dir:
		{
			colors: false
		},
		warn:
		{
			stream: 'stdout',
			prefix: colr.red.bold(' x '),
			color: compose(colr.green, colr.bold)
		},
	},
	clear: true,
	debug: true,
	count: true,
	timer: true
});

var log = c.log;

c.time();
c.time('X');

log('options:');
c.dir(c.options, Infinity);
log()

c.log('a', 'b', 'c');
c.log('%s/%s', 'b', 1);

c.count();
c.count();
c.count();

c.count('X');
c.count('X');

c.count();

c.options.styling.log = { color: colr.green };
c.debug('a', 'b', 'c');
c.debug('%s/%s', 'b', 1);
c.options.styling.log = { color: colr.bold };

c.info('a', 'b', 'c');
c.info('%s/%s', 'b', 1);

c.warn('a', 'b', 'c');
c.warn('%s/%s', 'b', 1);

c.error('a', 'b', 'c');
c.error('%s/%s', 'b', 1);

var tree = { x: 1, y: 2, 3: { 3: { 3: 'tree' }}};

log();
log('depth: 0');
c.dir(tree, 0);
log();

log('depth: 1');
c.dir(tree, 1);
log();

log('depth: default');
c.dir(tree);
log();

log('nocolors');
c.dir(tree, 'nocolors');
log();

log('std options');
c.dir(tree, { depth: 0, colors: true, showHidden: true });
log();

// c.clear();
c.timeEnd();
c.timeEnd('X');
c.timeEnd('Y');
c.timeEnd();
