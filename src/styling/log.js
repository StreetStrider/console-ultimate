

var
	same = require('aux.js/identity'),
	extend = require('aux.js/object/extend'),
	get = require('object-path').get,

	isColors = require('./styling').isColors;

module.exports = function (name)
{
	var
		defaults = genericDefaults[name],
		custom = genericCustom(name);

	return function (options)
	{
		var styles = extend({}, defaults);

		extend(styles, custom(options));

		if (! isColors(options))
		{
			styles.color = same;
		}

		return styles;
	}
}


var
	colr = require('cli-color'),

	blue = colr.blue,
	red  = colr.red,
	yellow = colr.yellow;

var genericDefaults =
{
	log:
	{
		color:   same,
		stream: 'stdout',
		prefix: '   '
	},
	info:
	{
		color:   blue,
		stream: 'stdout',
		prefix: ' ⓘ '
	},
	warn:
	{
		color:   yellow,
		stream: 'stderr',
		prefix: ' ⚠ '
	},
	error:
	{
		color:   red,
		stream: 'stderr',
		prefix: ' ⚡ '
	}
}

function genericCustom (name)
{
	var path = [ 'styling', name ];

	return function custom (options)
	{
		return get(options, path) || {};
	}
}
