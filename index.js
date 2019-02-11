
import value from './console'

Object.defineProperty(global, 'console',
{
	value,
	configurable: true,
})

export default value
