


var
	has = require('object-path').has,
	get = require('object-path').get;

var styling = module.exports = {};

styling.isColors = defaultEnabledButOnlyIfStyling('styling.colors');
styling.isPrefix = defaultEnabledButOnlyIfStyling('styling.prefix');

function defaultEnabledButOnlyIfStyling /* ow, shit! */ (path)
{
	return function (options)
	{
		if (! ('styling' in options))
		{
			/* default: all enabled */
			return true;
		}
		else if (! options.styling)
		{
			/* styling false → all false */
			return false;
		}
		else
		{
			if (! has(options, path))
			{
				/* default: feature enabled */
				return true;
			}
			else
			{
				/* explicit value → Boolean(value) */
				return !! get(options, path);
			}
		}
	}
}
