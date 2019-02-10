
/* import './' */
require('./')

var X = { x: 1, y: 2, z: [ 1, '2', true ]}

console.log(X)
console.warn(X)
console.info(X)

console.log('foo bar')
console.warn('foo bar')
console.info('foo bar')

console.dir(X)
console.dir('foo bar')
console.dir(console.dir)

// console.log('%s %d %j', 1, true, { x: 5 })
// console.log('%s %d', 1, true, { x: 5 })
// console.log('%s %d %j', 1, true)

// console.error(X)

console.log(console)