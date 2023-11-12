
import Console from './Console.js'

export default function upgrade (options)
{
	var value = Console(options)

	Object.defineProperty(global, 'console',
	{
		value,
		configurable: true,
	})

	return value
}
