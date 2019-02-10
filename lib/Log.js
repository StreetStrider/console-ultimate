
import { formatWithOptions as format } from 'util'
import { inspect } from 'util'

import is_colors from './is-colors'

export default function Log ({ inspect_with, stdout })
{
	function dir (data, options)
	{
		options = { ...inspect_with, ...options }
		options.colors = is_colors(options.colors, stdout)

		write_nl(inspect(data, options))

		return data
	}

	function log (...args)
	{
		var options = { ...inspect_with }
		options.colors = is_colors(options.colors, stdout)

		write_nl(prefix(format(options, ...args)))

		return args[0]
	}


	function write_nl (data)
	{
		write(nl(data))
	}

	function write (data)
	{
		stdout.write(data)
	}


	return { dir, log }
}


function prefix (line)
{
	return (' • ' + line)
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
