
import kleur from 'kleur'

import { Thru, As } from './Thru.js'
import Logformat from './Logformat.js'
import Errformat from './Errformat.js'
import sps from './spaced.js'
import * as unicode from './unicode.js'


export default function Err ({ inspect_with, writer })
{
	var { stream } = writer

	var px = sps(unicode.errformat1)
	var color = kleur.red

	var lf = Logformat({ stream, px, color, inspect_with })
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

	error.thru = Thru(error)
	error.as = As(error)

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
