
export default function Group ({ writer })
{
	var c = 0

	function group (name)
	{
		c++

		writer(' = ' + name)
		writer.transforms.push(indentation)
	}

	group.end = groupEnd

	function groupEnd ()
	{
		if (c)
		{
			c--
			writer.transforms.pop()
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
