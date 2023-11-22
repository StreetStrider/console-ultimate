
import { formatWithOptions as format } from './util.js'

import is_colors from './is-colors.js'
import prefix from './prefix.js'
import sps from './spaced.js'
import indent from './indent.js'
import colorize from './colorize.js'
import * as unicode from './unicode.js'


export default function Logformat (
{
	stream,
	px = sps(unicode.dot),
	color,
	inspect_with,
})
{
	var options = { ...inspect_with }
	options.colors = is_colors(options.colors, stream)

	return (args) =>
	{
		var
		_ = format(options, ...args)
		_ = prefix(px, _)
		_ = indent(_)
		_ = colorize(_, options.colors, color)

		return _
	}
}
