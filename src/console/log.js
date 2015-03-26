


var
	styling = require('../styling/log'),

	format = require('../format').format,
	prefix = require('../format').prefix;

module.exports = function (name)
{
	var styler = styling(name);

	return function ()
	{
		var styles = styler(this.options);

		var output = format(arguments);

		if (styles.prefix)
		{
			output = prefix(styles.prefix, output);
		}
		if (styles.color)
		{
			output = styles.color(output);
		}

		this.writer.writeln(styles.stream, output);
	}
}
