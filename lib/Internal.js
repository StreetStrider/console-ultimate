
import native from 'console'

import Name from 'function-name'

export default function Internal (name)
{
	var f = function (...args)
	{
		return native[name](...args)
	}

	Name(f, name)

	return f
}
