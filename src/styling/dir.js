


var
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
	customInspect: false,
	colors: true,

	/* Node defaults: */
	// showHidden: false,
	// depth: 2,
	// colors: false,
	// customInspect: true,
}

function custom (options)
{
	return get(options, 'styling.dir') || {};
}
