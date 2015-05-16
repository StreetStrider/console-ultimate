


var
	styling = require('../styling/groups'),
	isOn = require('../feature').isOn;

module.exports = function (console)
{
	if (isOn(console, 'groups'))
	{
		setup(console);
	}
}

function setup (console)
{
	console.group = function group ()
	{
		var styles = styling(console, console.options);

		console.writer.transform(grouped(styles));
	}

	console.group.end = console.groupEnd = function groupEnd ()
	{
		console.writer.transform.pop();
	}
}

function grouped (styles)
{
	var prefix = styles.prefix;

	return function (input)
	{
		return input
		.split('\n')
		.map(function (line, index, seq)
		{
			if (index + 1 === seq.length)
			{
				if (! line)
				{
					return '';
				}
			}
			return prefix + line;
		})
		.join('\n');
	}
}
