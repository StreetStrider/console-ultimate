/*

 • ⓘ ⚠ ⚡
 ⚫ ● ⬤
 ⁞ ⋮ ┆ ┊ ┋ ┇ ︙

**/

import { inspect } from 'util'

import { reset, yellow, blue } from 'kleur'

import Name from 'function-name'

import Writer from './Writer'
import Thru from './Thru'
import is_colors from './is-colors'
import logformat from './logformat'


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

	var log  = Log({ name: 'log',  px: ' ⚫ ', color: reset })
	var warn = Log({ name: 'warn', px: ' ⚫ ', color: yellow })
	var info = Log({ name: 'info', px: ' ⚫ ', color: blue })

	function Log ({ name, px, color })
	{
		var f = function (...args)
		{
			var _ = logformat(
			{
				px, color, inspect_with,

				stream: stdout,
				args,
			})

			write(_)
		}

		Name(f, name)

		f.thru = f._ = Thru(f)

		return f
	}

	return { log, warn, info, dir }
}
