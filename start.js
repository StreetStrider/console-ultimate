
/* import './' */
require('./')

// var X = { x: 17, x2: 1, y: true, z: [ null, NaN, /xyz/ ] }
// var Y = [ X, X, X ]

// console.table(17)

console.table(
[
	{ x: 1, y: 2 },
	{ y: 2, z: 3 },
	17,
	{ x: 1, z: 3 },
	[ 17 ],
	[[ 17 ]],
])

console.table(
{
	1: { x: 1, y: 2 },
	2: { y: 2, z: 3 },
	4: 17,
	5: 'aasdas\ndasdas',
	15: { x: 1, z: 3 },
	16: Symbol('foo'),
	25: [ 17 ],
	27: [[ 17 ]],
})
