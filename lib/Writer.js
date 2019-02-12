
export default function Writer (stream)
{
	function writer (data)
	{
		stream.write(data + '\n')
	}

	writer.stream = stream

	return writer
}
