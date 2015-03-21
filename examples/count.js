

var console, Console = require('..');

console = Console(null, null, {
	count: true
});

for (var i = 1; i <= 10; i++)
{
	console.count();
}

var label = 'custom';

for (var i = 1; i <= 10; i++)
{
	console.count(label);
}
