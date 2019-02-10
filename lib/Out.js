
import { formatWithOptions as format } from 'util'
import { inspect } from 'util'

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

		return data
	}

	var log  = Log({ name: 'log',  px: ' • ',  color: C.reset })
	var warn = Log({ name: 'warn', px: ' ⚠ ', color: C.yellow })
	var info = Log({ name: 'info', px: ' ⓘ ', color: C.blue })

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

			return args[0]
		}

		Fn(f, name)

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


	return { log, warn, info, dir }
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


/* 

	log:
	{
		color:   same,
		stream: 'stdout',
		prefix: ' • '
	},
	info:
	{
		color:   blue,
		stream: 'stdout',
		prefix: ' ⓘ '
	},
	warn:
	{
		color:   yellow,
		stream: 'stderr',
		prefix: ' ⚠ '
	},
	error:
	{
		color:   red,
		stream: 'stderr',
		prefix: ' ⚡ '
	}

*/
