
import { red } from 'kleur'
import Stack from 'stack-utils'

import Thru from './Thru'
import is_colors from './is-colors'
import errformat from './errformat'
import logformat from './logformat'
import { dot } from './unicode'


export default function Err ({ inspect_with, writer })
{
	var stream = writer.stream
	var colors = is_colors(inspect_with.colors, stream)

	var internals = Stack.nodeInternals()
	internals.push(/esm\/esm\.js:\d+:\d+\)?$/)

	var tracer = new Stack({ internals })

	function error (...args)
	{
		var e = args[0]

		if (e instanceof Error)
		{
			var { _, stack } = errformat({ colors, tracer, e })

			writer(_)
			writer(stack)
		}
		else
		{
			var _ = logformat(
			{
				px: dot,
				color: red,
				inspect_with,

				stream,
				args,
			})

			writer(_)
		}
	}

	error.thru = error._ = Thru(error)

	function trace ()
	{
		var e = { name: 'Trace' }

		Error.captureStackTrace(e, trace)

		var { _, stack } = errformat({ colors, tracer, e })

		writer(_)
		writer(stack)
	}

	return { error, trace }
}
