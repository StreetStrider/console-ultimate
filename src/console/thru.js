


var
	prop = require('aux.js/prop').value,
	isOn = require('../feature').isOn;

module.exports = function (console, fn)
{
	if (isOn(console, 'thru'))
	{
		prop(fn, 'thru', thruer(fn));
	}
}

function thruer (fn)
{
	return function thru (_)
	{
		fn.apply(null, arguments);
		return _;
	}
}
