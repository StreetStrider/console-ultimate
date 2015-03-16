

var
	colr = require('cli-color'),
	Console = require('../console-ultimate');

var c = Console(null, null,
{
	styling:
	{
		colors: true,
		dir:
		{
			colors: false
		},
		warn:
		{
			stream: 'stdout',
			prefix: colr.red.bold(' x '),
			color: function (v) { return colr.bold(colr.green(v)); }
		}
	}
});

var log = c.log;

log('options:');
c.dir(c.options, Infinity);
log()

c.log('a', 'b', 'c');
c.log('%s/%s', 'b', 1);

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
