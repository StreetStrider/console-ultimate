
import kleur from 'kleur'
const { reset } = kleur
const { bold } = kleur


import is_colors from './is-colors.js'

export default function Group ({ inspect_with, stdout, stderr })
{
	var colors = is_colors(inspect_with.colors, stdout.stream)

	var labels = []
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

			stdout(title(label, { colors, end: true }))
		}
	}

	return { group, groupEnd }
}


import indent from './indent.js'

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


function name (label, { colors, end })
{
	if (label)
	{
		if (colors)
		{
			label = bold(label)
		}

		label = ` ${ label }`

		if (! end)
		{
			label = label + ':'
		}
		else
		{
			label = label + '.'
		}

		return label
	}

	return ''
}
