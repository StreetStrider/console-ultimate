


var
	reset = require('cli-color').reset;

module.exports = function ()
{
	this._stdout.write(reset);
	this._stderr.write(reset);
}
