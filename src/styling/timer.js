


var
	same = require('aux.js/identity'),
	extend = require('aux.js/object/extend'),
	get = require('object-path').get,

	isColors = require('./styling').isColors,
	isPrefix = require('./styling').isPrefix;

module.exports = function (options)
{
	/* @dry */

	var styles = extend({}, defaults);

	extend(styles, custom(options));

	if (! isColors(options))
	{
		styles.colors = false;
	}

	if (! isPrefix(options))
	{
		styles.prefix = false;
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
