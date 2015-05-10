


var
	merge  = require('lodash.merge'),
	get = require('object-path').get,

	isColors = require('./styling').isColors,
	isPrefix = require('./styling').isPrefix;

module.exports = function (options)
{
	/* @dry */

	var styles = merge({}, defaults);

	merge(styles, custom(options));

	if (! isColors(options))
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
		customInspect: false,
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
