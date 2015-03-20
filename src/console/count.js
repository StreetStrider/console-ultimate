


var
	styling = require('../styling/count'),

	nl = require('../format').nl,
	prefix = require('../format').prefix;

exports.is = function (console)
{
	return !! console.options.count;
}

exports.setup = function (console)
{
	var counters = {};

	console.count = function (label)
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

		var output;
		if (label)
		{
			output = nl(label + ': ' + c);
		}
		else
		{
			output = nl(c);
		}

		var styles = styling(this.options);
		if (styles.prefix)
		{
			output = prefix(styles.prefix, output);
		}

		if (styles.color)
		{
			output = styles.color(output);
		}

		/* @dry */
		var stream = '_' + styles.stream;

		this[stream].write(output);
	}
}
