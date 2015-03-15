


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
