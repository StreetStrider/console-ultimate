

var
	inst = require('aux.js/inst'),
	prop = require('aux.js/prop'),

	expand = require('./options').expand,

	log = require('./console/log'),
	dir = require('./console/dir');

var Console = module.exports = function Console (stdout, stderr, options)
{
	var console = inst(Console);

	stdout || (stdout = process.stdout);
	stderr || (stderr = process.stderr);

	prop.value(console, '_stdout', stdout, 'write', 'config');
	prop.value(console, '_stderr', stderr, 'write', 'config');

	prop.value(console, 'options', expand(options, Console));

	bindings(console);

	return console;
}

Console.defaults = require('./options').defaults;


Console.prototype.log   = log('_stdout', 'log');
Console.prototype.info  = log('_stdout', 'info');
Console.prototype.error = log('_stderr', 'error');
Console.prototype.warn  = log('_stderr', 'warn');


Console.prototype.dir = dir;


function bindings (console)
{
	[
		'log',
		'info',
		'warn',
		'error',
		'dir'
	]
	.forEach(function (key)
	{
		console[key] = console[key].bind(console);
	});
}
