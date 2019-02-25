
// import Console from './Console'; var console = Console({ colors: false })
// import console from './console'
// import upgrade from './upgrade'; upgrade({ colors: false })
import '.'

var X = { x: 17, x2: 1, y: true, z: [ null, NaN, /xyz/ ] }
var Y = [ X, X, X ]

console.log(Y)
console.warn(Y)
console.info(Y)
console.error(Y)
console.debug(Y)
console.dirxml(Y)

console.log(console)
process.exit()

console.group('X')

console.table(
[
	{ x: 1, y: 2 },
	{ y: 2, z: 3 },
	17,
	{ x: 1, z: 3 },
	[ 17 ],
	[[ 17 ]],
	{ x: 1, a: [] },
	Symbol('S'),
])

console.group('Y')

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

console.group.end()
console.group.end()
