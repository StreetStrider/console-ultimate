
[ '_stdout',
  '_stderr',
  '_times',
  'log',
  'info',
  'warn',
  'error',
  'dir',
  'time',
  'timeEnd',
  'trace',
  'assert',
  'Console' ];

[ '_stdout',
  '_stderr',
  '_times',
  'log',
  'info',
  'warn',
  'error',
  'dir',
  'time',
  'timeEnd',
  'trace',
  'assert',
  'Console',
  'constructor',
  'toString',
  'toLocaleString',
  'valueOf',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  '__defineGetter__',
  '__lookupGetter__',
  '__defineSetter__',
  '__lookupSetter__' ];

var
	NL = '\n',

	slice = Array.prototype.slice,

	util = require('util'),

	colr = require('cli-color'),
	blue = colr.blue,
	red  = colr.red,
	yellow = colr.yellow,

	inst = require('aux.js/inst'),
	prop = require('aux.js/prop'),
	extend = require('aux.js/object/extend');

var Console = module.exports = function Console (stdout, stderr)
{
	var console = inst(Console);

	stdout || (stdout = process.stdout);
	stderr || (stderr = process.stderr);

	prop.value(console, '_stdout', stdout, 'write', 'config');
	prop.value(console, '_stderr', stderr, 'write', 'config');

	bindings(console);

	return console;
}

Console.prototype.log = function ()
{
	this._stdout.write(format(arguments) + NL);
}

Console.prototype.info = function ()
{
	this._stdout.write(blue(format(arguments) + NL));
}

Console.prototype.error = function ()
{
	this._stderr.write(red(format(arguments)) + NL);
}

Console.prototype.warn = function ()
{
	this._stderr.write(yellow(format(arguments) + NL));
}

function format (items)
{
	return util.format.apply(null, items);
}


Console.prototype.dir = (function ()
{

var dir = function (object, options /* flags */)
{
	if (arguments.length === 1)
	{
		options = doDefaults();
	}
	else if (isNodeLike(arguments))
	{
		options = doDefaults(options);
	}
	else
	{
		/* extended behavior: flags */
		var
			eff   = doDefaults(),
			flags = slice.call(arguments, 1);

		flags.forEach(doFlag(eff));

		options = eff;
	}

	this._stdout.write(util.inspect(object, options) + NL);
}


function doDefaults (options)
{
	if (! options)
	{
		return extend({}, defaults);
	}
	else
	{
		return extend({}, defaults, options);
	}
}

var defaults =
{
	customInspect: false,
	colors: true, /* for conformance with log, info, warn, error above,
	later it will be customizeable via Console(_, _, options) */

	/* Node defaults: */
	// showHidden: false,
	// depth: 2,
	// colors: false,
	// customInspect: true,
}

function isNodeLike (A)
{
	return (A.length === 2) && (Object(A[1]) === A[1]);
}

function doFlag (options)
{
	return function (flag)
	{
		switch (typeof flag)
		{
		case 'object':
			extend(options, flag);
			break;

		case 'number':
			extend(options, { depth: flag });
			break;

		case 'string':
			stringFlag(options, flag);
			break;

		}
	}
}

function stringFlag (options, flag)
{
	switch (flag)
	{
	case 'colors':
		extend(options, { colors: true });
		break;

	case 'nocolors':
		extend(options, { colors: false });
		break;

	case 'showHidden':
		extend(options, { showHidden: true });
		break;

	case 'customInspect':
		extend(options, { customInspect: true });
		break;

	}
}


return dir;

}());

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
