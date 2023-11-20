
import Name from 'function-name'


export function Thru1 (fn)
{
	var f = function (arg)
	{
		fn(arg)

		return arg
	}

	Name(f, fn.name + '$thru')

	return f
}


export function Thru (fn)
{
	var f = function (arg, ...args)
	{
		fn(arg, ...args)

		return arg
	}

	Name(f, fn.name + '$thru')

	return f
}


export function As (fn)
{
	var f = function (...prefix)
	{
		return (arg, ...args) =>
		{
			fn(...prefix, arg, ...args)

			return arg
		}
	}

	Name(f, fn.name + '$as')

	return f
}
