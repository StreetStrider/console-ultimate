
/* import './' */
require('./')

// var X = { x: 17, x2: 1, y: true, z: [ null, NaN, /xyz/ ] }
// var Y = [ X, X, X ]

console.table(
{
	1: { x: 1, y: 2 },
	2: { y: 2, z: 3 },
	3: 17,
	10: { x: 1, z: 3 },
	4: [ 17 ],
	20: [[ 17 ]],
	25: { x: 1, a: [] },
	21: Symbol('S'),
})
