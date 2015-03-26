


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
		if (! options.styling)
		{
			/* styling not exists = false (all false) */
			return false;
		}
		else
		{
			if (! has(options, path))
			{
				/* non-existent = true (default) */
				return true;
			}
			else
			{
				/* explicit value = Boolean(value) (explicit) */
				return !! get(options, path);
			}
		}
	}
}
