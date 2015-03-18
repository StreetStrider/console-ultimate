


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
	this._stdout.write(reset);
	this._stderr.write(reset);
}
