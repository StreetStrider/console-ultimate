
// import Console from './Console'; var console = Console({ colors: false })
// import console from './default'
// import upgrade from './upgrade'; upgrade({ colors: false })
import '.'

// var X = { x: 17, x2: 1, y: true, z: [ null, NaN, /xyz/ ] }
// var Y = [ X, X, X ]

console.log('-')

console.time()
console.time('X')
console.time('Y')
console.time.log('X')
console.time.log('Y')
console.time.log()

console.log('-')

console.timeEnd()
console.timeEnd('X')
console.timeEnd('Y')
console.timeEnd('Y')

console.log('-')
