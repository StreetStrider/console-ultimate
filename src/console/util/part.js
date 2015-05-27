


var
	prop = require('aux.js/prop').value,

	cat     = require('aux.js/array/cat'),
	partial = require('aux.js/fn/partial'),

	isOn = require('../../feature').isOn;

module.exports = function (console, fn)
{
	if (isOn(console, 'part'))
	{
		prop(fn, 'part', partialler(fn));
	}
}

function partialler (fn)
{
	return function part ()
	{
		return partial.apply(null, cat([ fn ], arguments));
	}
}
