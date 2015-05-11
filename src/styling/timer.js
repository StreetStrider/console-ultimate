


var
	same = require('aux.js/identity'),
	extend = require('aux.js/object/extend'),
	get = require('object-path').get,

	isColorsTty = require('./styling').isColorsTty,
	isPrefix = require('./styling').isPrefix;

module.exports = function (console, options)
{
	/* @dry */

	var styles = extend({}, defaults);

	extend(styles, custom(options));

	if (! isColorsTty(console, styles.stream, options))
	{
		styles.color = same;
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
