/* eslint-disable node/no-unsupported-features/node-builtins */

// import Console from './Console'; var console = Console({ colors: false })
// import console from './default'
// import upgrade from './upgrade'; upgrade({ colors: false })

import 'console-ultimate'

var X = { x: 17, x2: 1, y: true, z: [ null, NaN, /xyz/ ] }
var Y = [ X, X, X ]

console.group()
console.time()

console.log(X)
console.warn(X)
console.info(X)


console.count('C')
console.count('C')
console.count('C')

console.table(Y)

console.time.end()

console.group.end()

console.error(new TypeError)
