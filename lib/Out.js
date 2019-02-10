/*

 • ⓘ ⚠ ⚡
 ⚫ ● ⬤
 ⁞ ⋮ ┆ ┊ ┋ ┇ ︙

**/

import console from 'console'

import { formatWithOptions as format } from 'util'
import { inspect } from 'util'

import C from 'kleur'

import Name from 'function-name'

import Writer from './Writer'
import is_colors from './is-colors'
import prefix from './prefix'
import colorize from './colorize'
import Thru from './Thru'

export default function Out ({ inspect_with, stdout })
{
	var write = Writer(stdout)

	function dir (data, options)
	{
		options = { ...inspect_with, ...options }
		options.colors = is_colors(options.colors, stdout)

		write(inspect(data, options))
	}

	dir.thru = dir._ = Thru(dir)

	var log  = Log({ name: 'log',  px: ' ⚫ ', color: C.reset })
	var warn = Log({ name: 'warn', px: ' ⚫ ', color: C.yellow })
	var info = Log({ name: 'info', px: ' ⚫ ', color: C.blue })

	function Log ({ name, px, color })
	{
		var f = function (...args)
		{
			var options = { ...inspect_with }
			options.colors = is_colors(options.colors, stdout)

			var
			_ = format(options, ...args)
			_ = prefix(px, _)
			_ = colorize(_, options.colors, color)

			write(_)
		}

		Name(f, name)

		f.thru = f._ = Thru(f)

		return f
	}

	return { log, warn, info, dir }
}
