
export default function Group ({ stdout, stderr })
{
	var names = []

	var is_same = (stdout === stderr)

	function group (name)
	{
		stdout(' ■ ' + name)

		names.push(name)

		stdout.transforms.push(indentation)
		if (! is_same)
		{
			stderr.transforms.push(indentation)
		}
	}

	group.end = groupEnd

	function groupEnd ()
	{
		if (names.length)
		{
			var name = names.pop()

			stdout.transforms.pop()
			if (! is_same)
			{
				stderr.transforms.pop()
			}

			stdout(' ■ ' + name)
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
