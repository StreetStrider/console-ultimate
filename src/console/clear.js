


var
	reset = require('cli-color').reset,
	get = require('object-path').get,

	isOn = require('../feature').isOn;

module.exports = function (console)
{
	if (isOn(console, 'clear'))
	{
		console.clear = clear(console);
	}
}

function clear (console)
{
	return function clear ()
	{
		var streams = get(console.options, 'features.clear.streams');

		if (streams)
		{
			[].concat(streams).forEach(function (stream)
			{
				console.writer.write(stream, reset);
			});
		}
		else
		{
			console.writer.write('stdout', reset);
			console.writer.write('stderr', reset);
		}
	}
}
