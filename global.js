


var Console = require('./');

exports.replace = function replace (console)
{
	console = toConsole(console);

	Object.defineProperty(global, 'console', {
		get: function ()
		{
			return console;
		},

		enumerable:   true,
		configurable: true
	});
}

exports.patch = function patch (console)
{
	/* @todo: global-patch */
}

function toConsole (console)
{
	if (console instanceof Console)
	{
		return console;
	}
	else
	{
		return Console(null, null, console);
	}
}
