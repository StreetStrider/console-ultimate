


var
	same = require('aux.js/identity'),
	extend = require('aux.js/object/extend'),
	get = require('object-path').get,

	isColors = require('./styling').isColors;

module.exports = function (options)
{
	var styles = extend({}, defaults);

	extend(styles, custom(options));

	if (! isColors(options))
	{
		styles.colors = false;
	}

	return styles;
}

var defaults =
{
	color:   same,
	stream: 'stdout',
	prefix: ' ⌚ '
}

function custom (options)
{
	return get(options, 'styling.timer') || {};
}
