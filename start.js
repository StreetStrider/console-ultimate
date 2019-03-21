
// import Console from './Console'; var console = Console({ colors: false })
// import console from './default'
// import upgrade from './upgrade'; upgrade({ colors: false })
import '.'

// var X = { x: 17, x2: 1, y: true, z: [ null, NaN, /xyz/ ] }
// var Y = [ X, X, X ]

console.log('-')
console.time(console.color.red('1'))
console.time()
console.timeEnd()
console.timeEnd(console.color.red('1'))
console.log('-')
