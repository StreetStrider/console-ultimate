
import prefix from './prefix.js'
import sps from './spaced.js'
import * as unicode from './unicode.js'

var def = Symbol('default')


export default function Count ({ stdout: writer })
{
	var _ = Object.create(null)

	function count (label = def)
	{
		var v

		if (! (label in _))
		{
			v = _[label] = 1
		}
		else
		{
			v = ++_[label]
		}

		if (label !== def)
		{
			v = prefix(label + ' ', v)
		}

		v = prefix(sps(unicode.count), v)

		writer(v)
	}

	count.reset = countReset

	function countReset (label = def)
	{
		delete _[label]
	}

	return { count, countReset }
}
