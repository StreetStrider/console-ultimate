
/* import './' */
require('./')

var X = { x: 17, y: true, z: [ null, NaN, /xyz/ ] }

function F1 ()
{
	return F2()
}

function F2 ()
{
	return F3()
}

function F3 ()
{
	throw new TypeError('xyz')
}

try
{
	0 && F1()
}
catch (e)
{
	console.error(e)
}

0 && console.trace()

console.log(X)
console.warn(X)
console.assert(false, 'LOL %s', 17)
