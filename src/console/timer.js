


var
	styling = require('../styling/timer'),

	nl = require('../format').nl,
	format = require('../format').format,
	prefix = require('../format').prefix;

module.exports = function (console)
{
	var timers = {};

	console.time = function time (label)
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

	console.time.end = console.timeEnd = function timeEnd (label)
	{
		var delta = harvest(label);

		if (! (delta instanceof Error))
		{
			output(console, delta);
		}
		else
		{
			error(console, delta);
		}
	}

	function harvest (label)
	{
		label = toLabel(label);

		if (! (label in timers))
		{
			var message;
			if (label)
			{
				message = format([ 'no_such_timer: `%s`', label ]);
			}
			else
			{
				message = 'no_timer';
			}
			return new Error(message);
		}
		else
		{
			var
				now  = init(),
				prev = timers[label];

			delete timers[label];
			/* ^ Node does not do this,
			   if you need such behavior, post an issue

			   @task
			 */

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

	function error (console, error)
	{
		console.error(error.message);
	}
}
