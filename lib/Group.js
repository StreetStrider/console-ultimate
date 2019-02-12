
import is_colors from './is-colors'

export default function Group ({ inspect_with, stdout, stderr })
{
	var labels = []
	var colors = is_colors(inspect_with.colors, stdout.stream)
	var is_same = (stdout === stderr)

	function group (label)
	{
		stdout(title(label, { colors }))

		labels.push(label)

		stdout.transforms.push(indentation({ colors }))
		if (! is_same)
		{
			stderr.transforms.push(indentation({ colors }))
		}
	}

	group.end = groupEnd

	function groupEnd ()
	{
		if (labels.length)
		{
			var label = labels.pop()

			stdout.transforms.pop()
			if (! is_same)
			{
				stderr.transforms.pop()
			}

			stdout(title(label, { colors }))
		}
	}

	return { group, groupEnd }
}


import { reset } from 'kleur'

import indent from './indent'

var options =
{
	leading: true,
	prefix: ' ┊ ',
}

function indentation ({ colors })
{
	options = { ...options }

	if (colors)
	{
		options.prefix = reset(options.prefix)
	}

	return (data) =>
	{
		return indent(data, options)
	}
}


function title (label, options)
{
	return ' ■' + name(label, options)
}


import { bold } from 'kleur'

function name (label, { colors })
{
	if (label)
	{
		if (colors)
		{
			label = bold(label)
		}

		return ` ${ label }:`
	}

	return ''
}
