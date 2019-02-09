
import { formatWithOptions as format } from 'util'
import { inspect } from 'util'


export default function Log ({ inspect_with, stdout })
{
	function dir (data, options)
	{
		write_nl(inspect(data, { ...inspect_with, ...options }))

		return data
	}

	function log (...args)
	{
		write_nl(prefix(format(inspect_with, ...args)))

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
