/*

 • ⓘ ⚠ ⚡
 ⚫ ● ⬤
 ⁞ ⋮ ┆ ┊ ┋ ┇ ︙

**/

import console from 'console'

import { formatWithOptions as format } from 'util'
import { inspect } from 'util'

import Stack from 'stack-utils'

import Fn from 'function-name'

import C from 'kleur'

import is_colors from './is-colors'

export default function Out ({ inspect_with, stdout })
{
	function dir (data, options)
	{
		options = { ...inspect_with, ...options }
		options.colors = is_colors(options.colors, stdout)

		write_nl(inspect(data, options))
	}

	dir.thru = dir._ = Thru(dir)

	var log  = Log({ name: 'log',  px: ' ⚫ ', color: C.reset })
	var warn = Log({ name: 'warn', px: ' ⚫ ', color: C.yellow })
	var info = Log({ name: 'info', px: ' ⚫ ', color: C.blue })

	var error = Err()

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

			write_nl(_)
		}

		Fn(f, name)

		f.thru = f._ = Thru(f)

		return f
	}

	function Err ()
	{
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

				var do_colors = is_colors(inspect_with.colors, stdout)

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

	function Thru (fn)
	{
		var f = function (arg)
		{
			fn(arg)

			return arg
		}

		Fn(f, fn.name + '$thru')

		return f
	}


	function write_nl (data)
	{
		write(nl(data))
	}

	function write (data)
	{
		stdout.write(data)
	}


	return { log, warn, info, error, dir }
}


function prefix (px, line)
{
	return (px + line)
}

function colorize (line, is_colors, color)
{
	if (! is_colors)
	{
		return line
	}

	return color(line)
}

function nl (line)
{
	return (line + '\n')
}
