
import value from '.'

Object.defineProperty(global, 'console',
{
	value,
	configurable: true,
})
