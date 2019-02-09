
import { format } from 'util'
import { inspect } from 'util'


export default function Log ({ stdout })
{
	return (...args) =>
	{
		var line

		line = prepare(...args)
		line = prefix(line)
		line = nl(line)

		stdout.write(line)
	}
}

function prepare (...args)
{
	if (is_format(...args))
	{
		return format(...args)
	}
	else
	{
		return concat(...args)
	}
}

function concat (...args)
{
	return args
	.map(v => inspect(v))
	.join(' ')
}

function is_format (...args)
{
	if (args.length >= 1)
	{
		return (typeof args[0] === 'string')
	}
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
