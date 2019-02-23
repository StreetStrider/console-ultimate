
require = require('esm')(module)

var Console = require('./Console').default

module.exports = function upgrade (options)
{
	var value = Console(options)

	Object.defineProperty(global, 'console',
	{
		value,
		configurable: true,
	})

	return value
}
