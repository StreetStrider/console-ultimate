

var
	extend = require('aux.js/object/extend'),
	get = require('object-path').get;

module.exports = function (console, options)
{
	return extend({}, defaults, get(options, 'styling.groups') || {});
}

var defaults =
{
	prefix: '│'
}
