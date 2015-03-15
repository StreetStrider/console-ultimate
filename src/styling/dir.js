


var
	extend = require('aux.js/object/extend'),

	styling = require('./styling');

module.exports = function (options)
{
	var eff = extend({}, defaults);

	var isColors = styling.isColors(options);

	if (hasStyling(options))
	{
		extend(eff, options.styling.dir);
	}

	if (! isColors)
	{
		eff.colors = false;
	}

	return eff;
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

function hasStyling (options)
{
	if (! options.styling) return false;
	if (! options.styling.dir) return false;

	var dir = options.styling.dir;
	return Object(dir) === dir;
}
