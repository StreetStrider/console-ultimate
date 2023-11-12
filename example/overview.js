
require('console-ultimate')

console.log('console.log()')
console.warn('console.warn()')
console.info('console.info()')
console.debug('console.debug()')

console.group('grouping')
console.log('Foo')
console.log('Bar')
console.log('Baz')
console.group.end()

console.table(
[
	{ id: 1, name: 'Foo' },
	{ id: 22, name: 'Bar' },
	{ id: 333, name: 'Baz' },
])

console.time('timing')
console.count('counter')
console.count('counter')
console.count('counter')
console.time.end('timing')
