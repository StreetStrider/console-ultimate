


var
	extend = require('aux.js/object/extend'),
	get = require('object-path').get
	isColorsTty = require('./styling').isColorsTty;

module.exports = function (console, options)
{
	var styles = extend({}, defaults);

	extend(styles, get(options, 'styling.table') || {});

	if (! isColorsTty(console, styles.stream, options))
	{
		styles.color = false;
	}

	return styles;
}

var defaults =
{
	stream: 'stdout',
	color: true
}
