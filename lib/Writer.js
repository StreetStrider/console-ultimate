
export default function Writer (stream)
{
	return (data) =>
	{
		stream.write(data + '\n')
	}
}
