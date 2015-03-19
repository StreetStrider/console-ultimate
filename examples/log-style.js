

var
	compose = require('aux.js/fn/compose'),

	console,
	Console = require('..');

console = Console(process.stdout, process.stderr,
{
	styling: /* styling group of options */
	{
		log: /* `log` styling*/
		{
			prefix: ' ☺ ',
			color: Console.colors.green,
			// stream: 'stderr' // can `log` to stderr instead of stdout
		}
	}
});

console.log('smiley green log');

console.options.styling.log.color = console.colors.yellow;
console.log('smiley yellow log');

console.options.styling.log.color = compose(console.colors.bold, console.colors.green, console.colors.underline);
console.log('smiley complex log');
