
/* import './' */
require('./')

var X = { x: 17, y: true, z: [ null, NaN, /xyz/ ] }

console.dir(Object.keys(global))
console.group('Group')
console.dir(Object.keys(global))

console.group()
console.log(X)
console.info(X)
process.stdout.write('YYY\n')
console.warn(X)

console.error(X)
console.error(new Error('X'))
console.groupEnd() //<

console.error(new Error('X'))
console.dir(new Error('X'))
console.group.end() //<
