


var
	format = require('../format').format,
	nl = require('../format').nl,
	styling = require('../styling');

module.exports = function (stream, color, name)
{
	return function ()
	{
		var output = styling.applyIsColors(color, format(arguments), this.options);
		this[stream].write(nl(output));
	}
}
