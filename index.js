
require = require('esm')(module)

var value = module.exports = require('./console').default

Object.defineProperty(global, 'console',
{
	value,
	configurable: true,
})
