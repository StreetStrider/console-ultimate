


var
	styling = require('../styling/count'),

	prefix = require('../format').prefix,

	isOn = require('../feature').isOn;

module.exports = function (console)
{
	if (isOn(console, 'count'))
	{
		setup(console);
	}
}

function setup (console)
{
	var counters = {};

	console.count = function count (label)
	{
		if (arguments.length === 0)
		{
			label = '';
		}

		label = '' + label;
		if (! (label in counters))
		{
			counters[label] = 0;
		}

		counters[label]++;

		var c = counters[label];

		var output = c;
		if (label)
		{
			output = label + ': ' + c;
		}

		var styles = styling(console.options);
		if (styles.prefix)
		{
			output = prefix(styles.prefix, output);
		}

		if (styles.color)
		{
			output = styles.color(output);
		}

		console.writer.writeln(styles.stream, output);
	}
}
