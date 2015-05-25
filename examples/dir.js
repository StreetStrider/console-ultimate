


var
	Console = require('..'),
	console = Console(),

	log = console.log;

var
	prop = require('aux.js/prop').value;

var object =
{
	x: 1,
	y: [ 1, 2, 3 ],
	sub:
	{
		x: 2,
		y: 'y',
		sub2:
		{
			sub3: {},
			z: 'z'
		}
	}
}

prop(object, 'hidden', 42);
prop(object.sub, 'hidden2', 'secret');

log('dir,');
log('console.dir(object);');
console.dir(object);
log('');

log('dir with Node util.inspect options,')
log('console.dir(object, { depth: 1, showHidden: true });')
console.dir(object, { depth: 1, showHidden: true });
log('');

log('dir with flags,');
log('console.dir(object, 1, \'showHidden\');');
console.dir(object, 1, 'showHidden');

log('dir.retrieve:')
var retrieved = console.dir.retrieve(object);
console.writer.writeln('stdout', retrieved);
