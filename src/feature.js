


var has = require('object-path').has;

var feature = module.exports = {};

feature.isOn = function isOn (console, feature)
{
	var options = console.options;

	if (! has(options, 'features'))
	{
		return true;
	}
	else
	{
		var features = options.features;

		if (Object(features) !== features)
		{
			return !! features;
		}
		else
		{
			if (! has(features, feature))
			{
				return true;
			}
			else
			{
				return !! features[feature];
			}
		}
	}
}
