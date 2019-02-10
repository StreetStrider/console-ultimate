
import { formatWithOptions as format } from 'util'

import is_colors from './is-colors'
import prefix from './prefix'
import colorize from './colorize'


export default function logformat (
{
	px = ' ⚫ ',
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
	_ = colorize(_, options.colors, color)

	return _
}
