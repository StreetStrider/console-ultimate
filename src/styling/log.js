

var
	same = require('aux.js/identity'),
	extend = require('aux.js/object/extend'),

	colr = require('cli-color'),

	blue = colr.blue,
	red  = colr.red,
	yellow = colr.yellow,

	styling = require('./styling');

module.exports = function (name)
{
	var defaults = genericDefaults[name];

	return function (options)
	{
		var eff = extend({}, defaults);

		if (! styling.isColors(options))
		{
			eff.color = same;
		}

		return eff;
	}
}

var genericDefaults =
{
	log:
	{
		color: same
	},
	info:
	{
		color: blue
	},
	warn:
	{
		color: yellow
	},
	error:
	{
		color: red
	}
}
