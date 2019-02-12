/* eslint-disable no-underscore-dangle */

export default function Writer (stream)
{
	function writer (data)
	{
		data = tr(data, writer.transforms)

		tr_ed = true

		try
		{
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
				/* encoding is ignored; TODO? */
				var chunk = String(args[0])

				args[0] = tr(chunk, writer.transforms)
			}

			$write.apply(stream, args)
		}

		return writer
	}

	return writer
}


function tr (data, transforms)
{
	data = String(data)

	transforms.length && transforms.forEach(fn => (data = fn(data)))

	return data
}
