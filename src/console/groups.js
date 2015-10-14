


var
	styling = require('../styling/groups'),
	isOn = require('../feature').isOn;

module.exports = function (console)
{
	if (isOn(console, 'groups'))
	{
		setup(console);
	}
}

function setup (console)
{
	console.group = function group ()
	{
		var styles = styling(console, console.options);

		console.writer.transform(grouped(styles));
	}

	console.group.end = console.groupEnd = function groupEnd ()
	{
		console.writer.transform.pop();
	}
}


var bordered = require('../bordered')

function grouped (styles)
{
	return bordered(styles.prefix)
}
