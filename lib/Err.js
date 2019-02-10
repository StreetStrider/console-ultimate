
import C from 'kleur'

import Stack from 'stack-utils'

import writer from './writer'
import is_colors from './is-colors'
import prefix from './prefix'
import colorize from './colorize'
import Thru from './Thru'

export default function Err ({ colors, stderr })
{
	var write_nl = writer.write_nl(stderr)
	var do_colors = is_colors(colors, stderr)

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
			_ = colorize(_, do_colors, C.red)

			var internals = Stack.nodeInternals()
			internals.push(/esm\/esm\.js:\d+:\d+\)?$/)

			var stack = new Stack({ internals })

			stack = stack.clean(e.stack)
			stack = colorize(stack, do_colors, C.red)

			write_nl(_)
			write_nl(stack)
		}
	}

	error.thru = error._ = Thru(error)

	return error
}
