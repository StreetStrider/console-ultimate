
import strip from 'strip-ansi'
import slice from 'slice-ansi'

export default function indent (_, options)
{
	options || (options = {})

	var { prefix = '   ' } = options
	var { leading = false } = options
	var { spaced = false } = options

	_ = _.split('\n')
	_ = _.map((line, n) =>
	{
		if (! line) { return line }
		if ((! n) && (! leading)) { return line }

		if (spaced)
		{
			if (strip(line).charAt(0) === ' ')
			{
				line = slice(line, 1)
			}
		}

		return (prefix + line)
	})

	_ = _.join('\n')

	return _
}
