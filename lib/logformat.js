
import { formatWithOptions as format } from './util'

import is_colors from './is-colors'
import prefix from './prefix'
import indent from './indent'
import colorize from './colorize'
import { dot } from './unicode'


export default function logformat (
{
	px = dot,
	color,
	inspect_with,

	args,
	stream
})
{
	var options = { ...inspect_with }
	options.colors = is_colors(options.colors, stream)

	var
	_ = format(options, ...args)
	_ = prefix(px, _)
	_ = indent(_)
	_ = colorize(_, options.colors, color)

	return _
}
