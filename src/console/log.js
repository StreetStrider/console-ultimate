


var
	styling = require('../styling/log'),

	format = require('../format').format,
	nl = require('../format').nl;

module.exports = function (stream, name)
{
	var styler = styling(name);

	return function ()
	{
		var styles = styler(this.options);

		var output = format(arguments);
		output = nl(output);
		output = styles.color(output);

		this[stream].write(output);
	}
}
