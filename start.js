
/* import './' */
require('./')

var X = { x: 17, y: true, z: [ null, NaN, /xyz/ ] }

console.dir(Object.keys(global))

console.log(X)
console.info(X)
console.warn(X)

console.error(X)
console.error(new Error('X'))
