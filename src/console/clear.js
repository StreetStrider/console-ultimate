


var
	reset = require('cli-color').reset;

exports.is = function (console)
{
	return !! console.options.clear;
}

exports.setup = function (console)
{
	console.clear = clear;
}

function clear ()
{
	/* @todo: do multistream */
	/* @todo: stream(s) choosing */
	this.writer.write('stdout', reset);
	this.writer.write('stderr', reset);
}
