
import { red } from 'kleur'

import Stack from 'stack-utils'

import Writer from './Writer'
import is_colors from './is-colors'
import prefix from './prefix'
import colorize from './colorize'
import Thru from './Thru'

export default function Err ({ colors, stderr })
{
	colors = is_colors(colors, stderr)
	var write = Writer(stderr)

	var internals = Stack.nodeInternals()
	internals.push(/esm\/esm\.js:\d+:\d+\)?$/)

	var tracer = new Stack({ internals })

	function error (...args)
	{
		var e = args[0]

		if (e instanceof Error)
		{
			var typename = (e.name || e.constructor && e.constructor.name || 'Error')

			var _ = (typename + ':')

			if (e.message)
			{
				_ += (' ' + e.message)
			}
			if (e.code)
			{
				_ += (' ' + e.code)
			}

			_ = prefix(' ⚫ ', _)
			_ = colorize(_, colors, red)


			var
			stack = tracer.clean(e.stack)
			stack = colorize(stack, colors, red)

			write(_)
			write(stack)
		}
	}

	error.thru = error._ = Thru(error)

	return error
}
