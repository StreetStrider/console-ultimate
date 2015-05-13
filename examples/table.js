

var
	Console = require('..'),
	console = Console();

console.table([
	{ x: 1, y: 1 },
	{ x: 2, z: 1 },
	{ y: 2, z: 2 },
	{ x: 3, y: 3, z: 33 },
	{ z: { inner: 1, inner2: [1, 2, 3] } },
]);
