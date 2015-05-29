


var
	slice = Array.prototype.slice,
	extend = require('aux.js/object/extend'),
	merge  = require('lodash.merge');

var
	styling = require('../styling/dir'),
	inspect = require('../format').inspect,

	thru = require('./util/thru');

module.exports = function (console)
{
	console.dir = dir(console);
}

function dir (console)
{
	var retrieve = function retrieve (object, options /* flags */)
	{
		options = doOptions(console, arguments);

		return inspect(object, options.util);
	}

	var dir = function dir (object, options /* flags */)
	{
		options = doOptions(console, arguments);

		var inspected = inspect(object, options.util);

		console.writer.writeln(options.stream, inspected);
	}

	dir.retrieve = retrieve;
	thru(console, dir);

	return dir;
}

function doOptions (console, args)
{
	var options;

	if (args.length === 1)
	{
		options = doStyles(console);
	}
	else if (isNodeLike(args))
	{
		options = args[1];
		options = doStyles(console, { util: options });
	}
	else
	{
		/* extended behavior: flags */
		var
			eff   = doStyles(console),
			flags = slice.call(args, 1);

		eff.util || (eff.util = {});
		flags.forEach(doFlag(eff.util));

		options = eff;
	}

	return options;
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
	case 'hidden':
		util.showHidden = true;
		break;

	case 'customInspect':
	case 'inspect':
		util.customInspect = true;
		break;

	case 'noinspect':
		util.customInspect = false;
		break;

	}
}
