
export default function Group ({ stdout, stderr })
{
	var c = 0

	var is_same = (stdout === stderr)

	function group (name)
	{
		c++

		stdout.transforms.push(indentation)

		if (! is_same)
		{
			stderr.transforms.push(indentation)
		}
	}

	group.end = groupEnd

	function groupEnd ()
	{
		if (c)
		{
			c--

			stdout.transforms.pop()

			if (! is_same)
			{
				stderr.transforms.pop()
			}
		}
	}

	return { group, groupEnd }
}


import indent from './indent'

var options =
{
	leading: true,
	prefix: ' | ',
}

function indentation (data)
{
	return indent(data, options)
}
