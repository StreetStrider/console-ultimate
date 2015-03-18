


var
	has = require('object-path').has;

var styling = module.exports = {};

styling.isColors = function (options)
{
	if (! options.styling)
	{
		return false;
	}
	else
	{
		if (! has(options, 'styling.colors'))
		{
			/* non-existent: isColors = true */
			return true;
		}
		else
		{
			/* explicit value: isColors = Boolean(value) */
			return !! options.styling.colors;
		}
	}
}
