
export default function is_colors (colors, stream)
{
	if (colors === 'auto')
	{
		return (!! stream.isTTY)
	}

	return (!! colors)
}
