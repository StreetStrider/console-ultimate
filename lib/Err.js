
import { red } from 'kleur'

import Thru from './Thru'
import Logformat from './Logformat'
import Errformat from './errformat'
import { dot } from './unicode'


export default function Err ({ inspect_with, writer })
{
	var { stream } = writer

	var lf = Logformat({ stream, px: dot, color: red, inspect_with })
	var ef = Errformat({ stream, inspect_with })

	function error (...args)
	{
		var e = args[0]

		if (e instanceof Error)
		{
			var { _, stack } = ef(e)

			writer(_)
			writer(stack)
		}
		else
		{
			writer(lf(args))
		}
	}

	error.thru = error._ = Thru(error)

	function trace ()
	{
		var e = { name: 'Trace' }

		Error.captureStackTrace(e, trace)

		var { _, stack } = ef(e)

		writer(_)
		writer(stack)
	}

	return { error, trace }
}
