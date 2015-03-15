

var
	NL = '\n',
	util = require('util'),

	colr = require('cli-color'),
	blue = colr.blue,
	red  = colr.red,
	yellow = colr.yellow,

	inst = require('aux.js/inst'),
	prop = require('aux.js/prop'),

	expand = require('./options').expand,

	styling = require('./styling');

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


Console.prototype.log = function ()
{
	this._stdout.write(format(arguments) + NL);
}

Console.prototype.info = function ()
{
	var output = styling.applyIsColors(blue, format(arguments), this.options);
	this._stdout.write(output + NL);
}

Console.prototype.error = function ()
{
	var output = styling.applyIsColors(red, format(arguments), this.options);
	this._stderr.write(output + NL);
}

Console.prototype.warn = function ()
{
	var output = styling.applyIsColors(yellow, format(arguments), this.options);
	this._stderr.write(output + NL);
}

function format (items)
{
	return util.format.apply(null, items);
}


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
