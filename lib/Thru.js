
import Name from 'function-name'

export default function Thru (fn)
{
	var f = function (arg)
	{
		fn(arg)

		return arg
	}

	Name(f, fn.name + '$thru')

	return f
}
