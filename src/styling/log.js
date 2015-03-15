

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

		if (hasStyling(name, options))
		{
			extend(eff, options.styling[name]);
		}

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
		color: same,
		stream: 'stdout',
		prefix: '   '
	},
	info:
	{
		color: blue,
		stream: 'stdout',
		prefix: ' ⓘ '
	},
	warn:
	{
		color: yellow,
		stream: 'stderr',
		prefix: ' ⚠ '
	},
	error:
	{
		color: red,
		stream: 'stderr',
		prefix: ' ⚡ '
	}
}

function hasStyling (name, options)
{
	if (! options.styling) return false;

	var object = options.styling[name];
	if (! object) return false;

	return Object(object) === object;
}
