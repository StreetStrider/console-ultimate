

var
	compose = require('aux.js/fn/compose'),

	set = require('object-path').set

	Console = require('../console-ultimate'),
	colr = Console.colors;

var c = Console(null, null,
{
	styling:
	{
		colors: 'tty', // true -- colors always, false -- never and 'tty' (default value) -- respect tty
		// prefix: false,

		log:
		{
			color: colr.bold
		},
		dir:
		{
			util:
			{
				colors: true
			}
		},
		warn:
		{
			stream: 'stdout',
			prefix: colr.red.bold(' x '),
			color: compose(colr.green, colr.bold)
		},
	},
	features:
	{
		clear: false,
		debug: true,
		count: true
	}
});

var log = c.log;

c.time();
c.time('X');
c.time('Y');
c.time('retrieve');

log('options:');
c.dir(c.options, Infinity);
log();

log('terminal:');
log('columns: %s, rows: %s', c.dimensions.columns(), c.dimensions.rows());

c.log('a', 'b', 'c');
c.log('%s/%s', 'b', 1);

c.count();
c.count();
c.count();

c.count('X');
c.count('X');

c.count();

set(c.options, 'styling.log', { color: colr.green });
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
c.time.end('Y');
c.timeEnd('Z');
c.timeEnd();

var t = c.time.retrieve('retrieve');
log('timer retrieve:', t);

var t = c.time.retrieve('retrieve');
log('timer retrieve:', t);

try
{
	c.assert(false, 'something_wrong');
}
catch (e)
{
	c.error(e);
}

c.table([
	{ name: 'John Doe', role: 'offence', '#': 2 },
	{ name: 'Dell Conagher', role: 'defence', '#': 6 },
	{ name: 'Mr. Mundy', role: 'support', '#': 8 },
], [ '#', 'name', 'role' ]);

c.info('starting group:');
c.group();
c.count('G');
c.count('G');
c.info('starting group in group');
c.group();
c.count('G');
c.count('G');
c.count('G');
c.info('end inner group');
c.groupEnd();
c.info('ended');
c.info('end outer group');
c.group.end();
c.info('ended');

c.trace();
c.dir(c);
