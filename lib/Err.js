
import { red } from 'kleur'
import Stack from 'stack-utils'

import Thru from './Thru'
import is_colors from './is-colors'
import prefix from './prefix'
import indent from './indent'
import colorize from './colorize'
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
			var
			_ = head(e)
			_ = prefix(dot, _)
			_ = colorize(_, colors, red)

			var
			stack = tracer.clean(e.stack)
			stack = stack.replace(/\s+$/, '')
			stack = indent(stack, { prefix: '   • ', leading: true })
			stack = colorize(stack, colors, red)

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

	return error
}

// eslint-disable-next-line complexity
function head (e)
{
	var
	_ = (e.name || e.constructor && e.constructor.name || 'Error')
	_ += ':'

	if (e.message)
	{
		_ += (' ' + e.message)
	}
	if (e.code)
	{
		_ += (' ' + e.code)
	}

	return _
}
