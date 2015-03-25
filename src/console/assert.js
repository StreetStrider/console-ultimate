


var
	slice = Array.prototype.slice,
	ok = require('assert').ok,
	noop = require('aux.js/noop'),
	format = require('../format').format;

module.exports = function (console)
{
	/* @dry */
	if (('assert' in console.options) && (! console.options.assert))
	{
		stub(console);
	}
	else
	{
		setup(console);
	}
}

function setup (console)
{
	console.assert = function assert (expr)
	{
		if (! expr)
		{
			var args = slice.call(arguments, 1);

			ok(false, format(args));
		}
	}
}

function stub (console)
{
	console.assert = noop;
}
