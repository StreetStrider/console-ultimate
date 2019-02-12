
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
})
(stdout, stdout._write)

// console.log(stdout._write)
// console.log(stdout._writev)

console.dir(Object.keys(global))

console.log(X)
// console.info(X)
// console.warn(X)

// console.error(X)
// console.error(new Error('X'))

// console.dir(new Error('X'))

console.log('Spy', spy)
