


var
	slice = Array.prototype.slice,
	extend = require('aux.js/object/extend'),
	merge  = require('lodash.merge');

var
	styling = require('../styling/dir'),

	format = require('../format'),
	inspect = format.inspect,

	thru = require('./thru');

module.exports = function (console)
{
	console.dir = dir(console);
}

function dir (console)
{
	var dir = function dir (object, options /* flags */)
	{
		if (arguments.length === 1)
		{
			options = doStyles(console);
		}
		else if (isNodeLike(arguments))
		{
			options = doStyles(console, { util: options });
		}
		else
		{
			/* extended behavior: flags */
			var
				eff   = doStyles(console),
				flags = slice.call(arguments, 1);

			eff.util || (eff.util = {});
			flags.forEach(doFlag(eff.util));

			options = eff;
		}

		console.writer.writeln(options.stream, inspect(object, options.util));
	}

	thru(console, dir);

	return dir;
}

function doStyles (console, options)
{
	var eff = styling(console, console.options);

	if (options)
	{
		merge(eff, options);
	}

	return eff;
}

function isNodeLike (A)
{
	return (A.length === 2) && (Object(A[1]) === A[1]);
}

function doFlag (util)
{
	return function (flag)
	{
		switch (typeof flag)
		{
		case 'object':
			extend(util, flag);
			break;

		case 'number':
			util.depth = flag;
			break;

		case 'string':
			stringFlag(util, flag);
			break;

		}
	}
}

function stringFlag (util, flag)
{
	switch (flag)
	{
	case 'colors':
		util.colors = true;
		break;

	case 'nocolors':
		util.colors = false;
		break;

	case 'showHidden':
		util.showHidden = true;
		break;

	case 'customInspect':
		util.customInspect = true;
		break;

	}
}
