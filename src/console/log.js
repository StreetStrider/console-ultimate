


var
	styling = require('../styling/log'),

	format = require('../format').format,
	prefix = require('../format').prefix,
	nl = require('../format').nl;

module.exports = function (name)
{
	var styler = styling(name);

	return function ()
	{
		var styles = styler(this.options);

		var output = format(arguments);
		output = nl(output);

		if (styles.prefix)
		{
			output = prefix(styles.prefix, output);
		}
		if (styles.color)
		{
			output = styles.color(output);
		}

		var stream = '_' + styles.stream;

		this[stream].write(output);
	}
}
