


var
	extend = require('aux.js/object/extend');

var options = module.exports = {};

options.defaults =
{
	styling: true
}

options.expand = function (options, Console)
{
	return extend({}, Console.defaults, options || {});
}