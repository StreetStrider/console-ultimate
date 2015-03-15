


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

/* dynamic expand */
/*options.applier = function styling__applier (fnRule, fnDefault, fnApply)
{
	return function style_apply (options, args)
	{
		var rule = fnRule(options);
		if (! rule)
		{
			rule = fnDefault();
		}
		
		return fnApply(args, rule);
	}
}*/
