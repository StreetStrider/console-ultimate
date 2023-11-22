
import Stack from 'stack-utils'
import kleur from 'kleur'

import is_colors from './is-colors.js'
import prefix from './prefix.js'
import sps from './spaced.js'
import indent from './indent.js'
import colorize from './colorize.js'
import * as unicode from './unicode.js'

var { red } = kleur


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
		_ = prefix(sps(unicode.errformat1), _)
		_ = colorize(_, colors, red)

		var stack = (e.stack || '')
		if (stack)
		{
			stack = tracer.clean(stack)
			stack = stack.replace(/\s+$/, '')
			stack = indent(stack, { prefix: `   ${ unicode.errformat2 } `, leading: true })
			stack = colorize(stack, colors, red)
		}

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
