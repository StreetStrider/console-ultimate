
export default function indent (_, options)
{
	options || (options = {})

	var { prefix = '   ' } = options
	var { leading = false } = options

	_ = _.split('\n')
	_ = _.map((line, n) =>
	{
		if (! line) { return line }
		if ((! n) && (! leading)) { return line }

		return (prefix + line)
	})

	_ = _.join('\n')

	return _
}
