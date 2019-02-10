
export default function colorize (line, is_colors, color)
{
	if (! is_colors)
	{
		return line
	}

	return color(line)
}
