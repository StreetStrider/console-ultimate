

var
	Console = require('../'),
	console = Console();

console.info('+ group');
console.group();
console.log('value: %', 'some_value');
console.table([1, 2, 3]);

console.info('+ group');
console.group();
console.warn('some warn');
console.count();
console.count();
console.count();
console.info('- group');
console.groupEnd();
console.info('- group, ok');

console.count();
console.count();
console.info('- group');
console.group.end();
console.info('- group, ok');

console.info('another prefix for group:');
console.options.styling = { groups: { prefix: ' ☺ ' }};
console.group();
console.table([1, 2, 3]);
console.group.end();
