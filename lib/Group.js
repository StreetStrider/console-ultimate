
export default function Group ({ stdout, stderr })
{
	var labels = []

	var is_same = (stdout === stderr)

	function group (label)
	{
		stdout(title(label))

		labels.push(label)

		stdout.transforms.push(indentation)
		if (! is_same)
		{
			stderr.transforms.push(indentation)
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

			stdout(title(label))
		}
	}

	return { group, groupEnd }
}


import { reset } from 'kleur'

import indent from './indent'

var options =
{
	leading: true,
	prefix: reset(' ┊ '),
}

function indentation (data)
{
	return indent(data, options)
}


function title (label)
{
	return ' ■' + name(label)
}


import { bold } from 'kleur'

function name (label)
{
	if (label)
	{
		return ` ${ bold(label) }:`
	}
	return ''
}
