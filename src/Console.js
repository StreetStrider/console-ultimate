

var
	inst = require('aux.js/inst'),
	prop = require('aux.js/prop'),

	reset = require('cli-color').reset,

	expand = require('./options').expand,

	log = require('./console/log'),
	dir = require('./console/dir'),

	bindings = require('./bindings');

var Console = module.exports = function Console (stdout, stderr, options)
{
	var console = inst(Console);

	stdout || (stdout = process.stdout);
	stderr || (stderr = process.stderr);

	prop.value(console, '_stdout', stdout, 'write', 'config');
	prop.value(console, '_stderr', stderr, 'write', 'config');

	prop.value(console, 'options', expand(options, Console));

	bind(console);

	return console;
}

Console.defaults = require('./options').defaults;


function bind (console)
{
	bindings(console,
	[
		'log',
		'info',
		'warn',
		'error',
		'dir'
	]);
}


Console.prototype.log   = log('log');
Console.prototype.info  = log('info');
Console.prototype.error = log('error');
Console.prototype.warn  = log('warn');


Console.prototype.dir = dir;


Console.prototype.clear = function ()
{
	this.log(reset);
}
