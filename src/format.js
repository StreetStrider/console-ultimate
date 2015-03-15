

var
	NL = '\n',
	rPt = /%/g,
	util = require('util');

var format = module.exports = {};

format.nl = function (string)
{
	return string + NL;
}

format.prefix = function (prefix, string)
{
	prefix = prefix.replace(rPt, '%%');

	return prefix + string;
}

format.format = function format (items)
{
	return util.format.apply(null, items);
}

format.inspect = function inspect (object, options)
{
	return util.inspect(object, options);
}
