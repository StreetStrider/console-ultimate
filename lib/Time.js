
import hrtime from 'pretty-hrtime'

import prefix from './prefix'
import { time as t } from './unicode'

var def = Symbol('default')


export default function Time ({ stdout: writer })
{
	var _ = Object.create(null)

	function time (label = def)
	{
		_[label] = process.hrtime()
	}

	time.log = timeLog

	time.end = timeEnd

	function timeLog (label = def)
	{
		track(label)
	}

	function timeEnd (label = def)
	{
		track(label)
		delete _[label]
	}

	function track (label)
	{
		if (! (label in _)) { return }

		var v = _[label]

		v = process.hrtime(v)
		v = hrtime(v)

		if (label !== def)
		{
			v = prefix(label + ' ', v)
		}

		v = prefix(t, v)

		writer(v)
	}

	return { time, timeLog, timeEnd }
}
