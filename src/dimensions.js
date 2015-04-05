

var
	isOn = require('./feature').isOn;

module.exports = function (console)
{
	if (isOn(console, 'dimensions'))
	{
		setup(console);
	}
}

function setup (console)
{
	var dimensions = {};

	dimensions.columns = function (name)
	{
		var stream = getStream(console, name);

		if (stream && stream.columns)
		{
			return stream.columns;
		}
		else
		{
			return Infinity;
		}
	}

	dimensions.rows = function (name)
	{
		var stream = getStream(console, name);

		if (stream && stream.rows)
		{
			return stream.rows;
		}
		else
		{
			return Infinity;
		}
	}

	console.dimensions = dimensions;
}

function getStream (console, name)
{
	name || (name = 'stdout');

	return console.writer.get(name);
}