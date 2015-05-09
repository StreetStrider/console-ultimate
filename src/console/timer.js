


var
	noop = require('aux.js/noop'),
	get = require('object-path').get,

	styling = require('../styling/timer'),

	format = require('../format').format,
	prefix = require('../format').prefix,

	isOn = require('../feature').isOn;

module.exports = function (console)
{
	if (isOn(console, 'timer'))
	{
		setup(console);
	}
	else
	{
		stub(console);
	}
}

function setup (console)
{
	var
		model  = TimeModel(console),
		timers = {};

	console.time = function time (label)
	{
		label = toLabel(label);

		timers[label] = model.start();
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

	console.time.end = console.timeEnd = function timeEnd (label)
	{
		var delta = harvest(label);

		if (! (delta instanceof Error))
		{
			model.output(delta);
		}
		else
		{
			error(console, delta);
		}
	}

	console.time.retrieve = function time__retrieve (label)
	{
		var delta = harvest(label);

		if (! (delta instanceof Error))
		{
			return delta.value;
		}
		else
		{
			return delta;
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
			var prev = timers[label];

			delete timers[label];
			/* ^ Node does not do that,
			   if you need such behavior, post an issue:
			   https://github.com/StreetStrider/console-ultimate/issues

			   @task
			 */

			return model.stop(label, prev);
		}
	}

	function error (console, error)
	{
		console.error(error.message);
	}
}

function stub (console)
{
	console.time = noop;
	console.timeEnd = noop;
}

function TimeModel (console)
{
	var
		model,
		hr = get(console.options, 'features.timer.hrtime', true);

	if (hr)
	{
		var pretty = require('pretty-hrtime');

		model = {
			start: process.hrtime,
			stop:  function (label, prev)
			{
				return {
					label: label,
					value: nanodelta(model.start(), prev)
				};
			},
			output: function (delta)
			{
				delta.value = pretty(delta.value, { precise: true });

				basic_output(delta);
			}
		};
	}
	else
	{
		model = {
			start: function () { return +new Date; },
			stop:  function (label, prev)
			{
				return {
					label: label,
					value: model.start() - prev
				};
			},
			output: function (delta)
			{
				delta.value += ' ms';

				basic_output(delta);
			}
		};
	}

	function basic_output (delta)
	{
		var
			output = delta.value,
			label  = delta.label;

		if (label)
		{
			output = label + ': ' + output;
		}
		else
		{
			output = output;
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

	return model;
}

function nanodelta (t2, t1)
{
	var
		delta, ndelta,

		s1 = t1[0],
		s2 = t2[0],

		ns1 = t1[1],
		ns2 = t2[1];

	delta = s2 - s1;
	ndelta = ns2 - ns1;

	if (ndelta < 0)
	{
		delta  = delta  - 1;
		ndelta = ndelta + 1e9;
	}

	return [ delta, ndelta ];
}
