


var
	prop = require('aux.js/prop').value,
	isOn = require('../feature').isOn;

module.exports = function thru (console, fn)
{
	if (isOn(console, 'thru'))
	{
		prop(fn, 'thru', fnThru(fn));
	}
}

function fnThru (fn)
{
	return function thru (_)
	{
		fn.apply(null, arguments);
		return _;
	}
}
