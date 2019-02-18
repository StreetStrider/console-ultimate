
/* import './' */
require('./')

var X = { x: 17, y: true, z: [ null, NaN, /xyz/ ] }
var Y = [ X, X, X ]

console.log(Y)
console.table(Y)
