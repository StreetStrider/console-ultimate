
export default function Writer (stream)
{
	function writer (data)
	{
		data = tr(data, writer.transforms)

		stream.write(data + '\n')
	}

	writer.stream = stream

	writer.transforms = []

	return writer
}


function tr (data, transforms)
{
	data = String(data)

	transforms.length && transforms.forEach(fn => (data = fn(data)))

	return data
}
