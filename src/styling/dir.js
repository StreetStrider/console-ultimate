


var
	merge  = require('lodash.merge'),
	get = require('object-path').get,

	isColorsTty = require('./styling').isColorsTty,
	isPrefix = require('./styling').isPrefix;

module.exports = function (console, options)
{
	/* @dry */

	var styles = merge({}, defaults);

	merge(styles, custom(options));

	if (! isColorsTty(console, styles.stream, options))
	{
		styles.util.colors = false;
	}

	return styles;
}

var defaults =
{
	stream: 'stdout',
	util:
	{
		colors: true,

		/* Node defaults: */
		// showHidden: false,
		// depth: 2,
		// colors: false,
		// customInspect: true,
	}
}

function custom (options)
{
	return get(options, 'styling.dir') || {};
}
