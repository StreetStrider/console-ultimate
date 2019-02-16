
/* import './' */
require('./')

// var X = { x: 17, y: true, z: [ null, NaN, /xyz/ ] }

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
	F1()
}
catch (e)
{
	console.error(e)
}
