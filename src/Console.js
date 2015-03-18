

var
	inst = require('aux.js/inst'),
	prop = require('aux.js/prop'),

	expand = require('./options').expand,

	log = require('./console/log'),
	dir = require('./console/dir'),

	feature = require('./feature'),
	clear = require('./console/clear'),
	debug = require('./console/debug'),

	bindings = require('./bindings');

var Console = module.exports = function Console (stdout, stderr, options)
{
	var console = inst(Console);

	stdout || (stdout = process.stdout);
	stderr || (stderr = process.stderr);

	prop.value(console, '_stdout', stdout, 'write', 'config');
	prop.value(console, '_stderr', stderr, 'write', 'config');

	prop.value(console, 'options', expand(options, Console));

	feature(console, clear);
	feature(console, debug);

	bind(console);

	return console;
}

Console.defaults = require('./options').defaults;

Console.colors = Console.prototype.colors = require('cli-color');

Console.prototype.log   = log('log');
Console.prototype.info  = log('info');
Console.prototype.error = log('error');
Console.prototype.warn  = log('warn');

Console.prototype.dir = dir;

function bind (console)
{
	bindings(console,
	[
		'log',
		'info',
		'warn',
		'error',

		'dir',

		'clear',
		'debug'
	]);
}
