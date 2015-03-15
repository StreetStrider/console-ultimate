


var
	NL = '\n',
	util = require('util'),

	slice = Array.prototype.slice,
	extend = require('aux.js/object/extend'),

	styling = require('../styling/dir');

var dir = module.exports = function (object, options /* flags */)
{
	var console = this;

	if (arguments.length === 1)
	{
		options = doStyles(console);
	}
	else if (isNodeLike(arguments))
	{
		options = doStyles(console, options);
	}
	else
	{
		/* extended behavior: flags */
		var
			eff   = doStyles(console),
			flags = slice.call(arguments, 1);

		flags.forEach(doFlag(eff));

		options = eff;
	}

	console._stdout.write(util.inspect(object, options) + NL);
}


function doStyles (console, options)
{
	var eff = styling(console.options);

	if (options)
	{
		extend(eff, options);
	}

	return eff;
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
