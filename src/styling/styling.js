


var
	has = require('object-path').has,
	get = require('object-path').get;

var styling = module.exports = {};

styling.isColors = defaultButOnlyIfStyling('styling.colors', 'tty');
styling.isPrefix = defaultButOnlyIfStyling('styling.prefix', true);

function defaultButOnlyIfStyling /* ow, shit! */ (path, def)
{
	return function (options)
	{
		if (! ('styling' in options))
		{
			/* default */
			return def;
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
				/* default */
				return def;
			}
			else
			{
				/* explicit value */
				return get(options, path);
			}
		}
	}
}

styling.isColorsTty = function (console, stream, options)
{
	var value = styling.isColors(options);

	if ((value === 'tty') || (value === undefined))
	{
		stream = console.writer.get(stream);

		if (stream)
		{
			return !! stream.isTTY;
		}
		else
		{
			return false;
		}
	}
	else
	{
		return !! value;
	}
}
