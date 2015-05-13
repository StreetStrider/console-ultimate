

var
	Console = require('..'),
	console = Console();

console.info('array of objects');
console.table([
	{ x: 1, y: 1 },
	{ x: null, z: '1' },
	{ y: 2, z: 2 },
	{ x: 3, y: /rg/, z: 33 },
	{ z: { inner: 1, inner2: [1, 2, 3] } },
	{ x: console, y: function () {}, z: NaN },
]);

console.info('object of objects');
console.table({
	x: { x: 1 },
});

console.info('array of arrays');
console.table([[ 1, 2 ], [ 3 ]]);

console.info('object of scalars');
console.table({
	x: 1,
	y: 2,
	z: 3,
});

console.info('array of scalars');
console.table([ 1, 2, 3 ]);

console.info('filter visible columns');
console.table([
	{ x: 1, y: 2 },
	{ x: 2 },
	{ x: 3 },
], [ 'x' ]);
