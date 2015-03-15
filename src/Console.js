

var
	inst = require('aux.js/inst'),
	prop = require('aux.js/prop'),
	same = require('aux.js/identity'),

	expand = require('./options').expand,

	log = require('./console/log'),

	colr = require('cli-color'),
	blue = colr.blue,
	red  = colr.red,
	yellow = colr.yellow;

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


Console.prototype.log = log('_stdout', same, 'log');
Console.prototype.info = log('_stdout', blue, 'info');
Console.prototype.error = log('_stderr', red, 'error');
Console.prototype.warn = log('_stderr', yellow, 'warn');


Console.prototype.dir = require('./console/dir');


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
