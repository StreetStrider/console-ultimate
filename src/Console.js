

var
	inst = require('aux.js/inst'),
	prop = require('aux.js/prop'),
	extend = require('aux.js/object/extend'),

	expand = require('./options').expand,

	Writer = require('./Writer'),

	log = require('./console/log'),
	dir = require('./console/dir'),
	timer = require('./console/timer'),
	assert = require('./console/assert'),
	trace = require('./console/trace'),

	clear = require('./console/clear'),
	debug = require('./console/debug'),
	count = require('./console/count'),

	bindings = require('./bindings');

var Console = module.exports = function Console (stdout, stderr, options)
{
	var console = inst(Console);

	stdout || (stdout = process.stdout);
	stderr || (stderr = process.stderr);

	prop.value(console, 'writer', Writer());
	console.writer.add('stdout', stdout);
	console.writer.add('stderr', stderr);

	prop.value(console, 'options', expand(options, Console));

	log(console);
	clear(console);
	debug(console);
	count(console);

	timer(console);
	assert(console);
	trace(console);

	bind(console);

	return console;
}

Console.defaults = extend({}, require('./options').defaults);

Console.colors = Console.prototype.colors = require('cli-color');

Console.prototype.dir = dir;

function bind (console)
{
	bindings(console,
	[
		'dir'
	]);
}
