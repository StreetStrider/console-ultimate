/* eslint-disable no-underscore-dangle */

export default function Writer (stream)
{
	function writer (data)
	{
		try
		{
			data  = tr(data, writer.transforms)
			tr_ed = true

			stream.write(data + '\n')
		}
		finally
		{
			tr_ed = false
		}
	}

	writer.stream = stream

	writer.transforms = []

	Intercept(writer)

	var tr_ed = false

	function Intercept (writer)
	{
		var stream = writer.stream

		var $write = stream._write

		stream._write = function (...args)
		{
			if (! tr_ed)
			{
				/* TODO: consider encoding */
				args[0] = tr(args[0], writer.transforms)
			}

			$write.apply(stream, args)
		}

		return writer
	}

	return writer
}


function tr (data, transforms)
{
	if (typeof data !== 'string')
	{
		return data
	}

	for (let n = transforms.length; n; n--)
	{
		data = transforms[n - 1](data)
	}

	return data
}
