/* eslint-disable no-underscore-dangle */

/* import './' */
require('./')

var X = { x: 17, y: true, z: [ null, NaN, /xyz/ ] }

var stdout = process.stdout

var spy = []

stdout._write = ((stream, $write) =>
{
	return function write (...args)
	{
		spy.push(args[0])

		$write.apply(stream, args)
	}
})(
	stdout,
	stdout._write
)

console.group('GR')
console.dir(Object.keys(global))

console.group()
console.log(X)
console.info(X)
console.warn(X)

console.error(X)
console.error(new Error('X'))
console.groupEnd() //<

console.error(new Error('X'))
console.dir(new Error('X'))
console.groupEnd() //<

console.log('Spy', spy)
