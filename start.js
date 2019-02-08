
// import './'
require('./')

console({ x: 1 })

// import c from './console'
console(console === require('./console').default)
