


var
	Console = require('./'),
	console = Console();

Object.defineProperty(global, 'console', {
	get: function ()
	{
		return console;
	},

	enumerable:   true,
	configurable: true
});
