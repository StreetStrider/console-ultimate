


var
	slice = Array.prototype.slice,
	ok = require('assert').ok,
	noop = require('aux.js/noop'),
	format = require('../format').format,
	defaultEnabled = require('../options').defaultEnabled;

module.exports = function (console)
{
	if (defaultEnabled(console.options, 'assert'))
	{
		setup(console);
	}
	else
	{
		stub(console);
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
