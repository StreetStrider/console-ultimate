
export default
{
	write (stream)
	{
		return (data) =>
		{
			stream.write(data)
		}
	},
	write_nl (stream)
	{
		return (data) =>
		{
			stream.write(nl(data))
		}
	},
}

function nl (line)
{
	return (line + '\n')
}
