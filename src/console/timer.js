


var
	styling = require('../styling/timer'),

	nl = require('../format').nl,
	prefix = require('../format').prefix;

exports.is = function (console)
{
	return !! console.options.timer;
}

exports.setup = function (console)
{
	var timers = {};

	console.time = function (label)
	{
		label = toLabel(label);

		timers[label] = init();
	}

	function toLabel (label)
	{
		if (typeof label === 'undefined')
		{
			return '';
		}
		else
		{
			return '' + label;
		}
	}

	function init ()
	{
		return { tick: +new Date };
	}

	console.timeEnd = function (label)
	{
		var delta = recieve(label);

		output(console, delta);
	}

	function recieve (label)
	{
		label = toLabel(label);

		if (! (label in timers))
		{
			return new Error('no_such_timer: `%s`', label);
		}
		else
		{
			var
				now  = init(),
				prev = timers[label];

			return delta(label, now, prev);
		}
	}

	function delta (label, now, prev)
	{
		return {
			label: label,
			value: now.tick - prev.tick
		}
	}

	function output (console, delta)
	{
		var
			output,
			label = delta.label,
			value = delta.value;

		output = value + 'ms';

		if (label)
		{
			output = label + ': ' + output;
		}
		else
		{
			output = output;
		}

		output = nl(output);

		var styles = styling(console.options);
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

		console[stream].write(output);
	}
}
