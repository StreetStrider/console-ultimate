


var styling = module.exports = {};

styling.isColors = function (options)
{
	if (! options.styling)
	{
		return false;
	}
	else
	{
		if (options.styling.colors === undefined)
		{
			return true;
		}
		else
		{
			return !! options.styling.colors;
		}
	}
}

styling.applyIsColors = function (asciiFn, string, options)
{
	if (styling.isColors(options))
	{
		return asciiFn(string);
	}
	else
	{
		return string;
	}
}
