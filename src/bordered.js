


var bordered = module.exports = function (prefix)
{
	return function bordered__by (it)
	{
		return it
		.split('\n')
		.map(function (line, index, seq)
		{
			if (index + 1 === seq.length)
			{
				if (! line)
				{
					return '';
				}
			}
			return prefix + line;
		})
		.join('\n');
	}
}

bordered.prefix = ' | '
