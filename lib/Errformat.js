
import Stack from 'stack-utils'
import { red } from 'kleur'

import is_colors from './is-colors'
import prefix from './prefix'
import indent from './indent'
import colorize from './colorize'
import { dot } from './unicode'


export default function Errformat (
{
	stream,

	inspect_with,
})
{
	var colors = is_colors(inspect_with.colors, stream)

	var internals = Stack.nodeInternals()
	internals.push(/esm\/esm\.js:\d+:\d+\)?$/)
	internals.push(/Generator.next \(<anonymous>\)/)

	var tracer = new Stack({ internals })

	return (e) =>
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

		return { _, stack }
	}
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
