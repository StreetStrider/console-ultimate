


var
	extend = require('aux.js/object/extend');

var options = module.exports = {};

options.defaults = {}; /* injected in Console.defaults, can be patched with ref saving */

options.expand = function (options, Console)
{
	return extend({}, Console.defaults, options || {});
}

options.defaultEnabled = function (object, key)
{
	return ! ((key in object) && (! object[key]));
}
