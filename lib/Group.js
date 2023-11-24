
import kleur from 'kleur'

import is_colors from './is-colors.js'


export default function Group ({ inspect_with, stdout, stderr })
{
	var colors = is_colors(inspect_with.colors, stdout.stream)

	var labels = []
	var is_same = (stdout === stderr)

	function group (label)
	{
		stdout(begin(label, colors))

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

			stdout(end(label, colors))
		}
	}

	return { group, groupEnd }
}


import indent from './indent.js'
import sps from './spaced.js'
import * as unicode from './unicode.js'

var options =
{
	leading: true,
	prefix: sps(unicode.group_pipe)
}

function indentation ({ colors })
{
	options = { ...options }

	if (colors)
	{
		options.prefix = kleur.reset(options.prefix)
	}

	return (data) =>
	{
		return indent(data, options)
	}
}


function begin (label, colors)
{
	return ' ' + unicode.group_begin + title(label, ':', colors)
}

function end (label, colors)
{
	return ' ' + unicode.group_end + title(label, '', colors)
}


function title (label, sff, colors)
{
	if (! label) return ''

	if (colors)
	{
		label = kleur.bold(label)
	}

	label = ` ${ label }${ sff }`

	return label
}
