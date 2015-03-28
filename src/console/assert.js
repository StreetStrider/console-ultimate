


var
	slice = Array.prototype.slice,
	ok = require('assert').ok,
	noop = require('aux.js/noop'),
	format = require('../format').format,
	isOn = require('../feature').isOn;

module.exports = function (console)
{
	if (isOn(console, 'assert'))
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
