


var
	styling = require('../styling/log'),

	format = require('../format').format,
	prefix = require('../format').prefix;

module.exports = function (console)
{
	console.log   = fn(console, 'log');
	console.info  = fn(console, 'info');
	console.error = fn(console, 'error');
	console.warn  = fn(console, 'warn');
}

function fn (console, name)
{
	var styler = styling(name);

	return function logger ()
	{
		var styles = styler(console.options);

		var output = format(arguments);

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
