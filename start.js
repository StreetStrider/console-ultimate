
// import './'
require('./')

console.log({ x: 1 })

// import c from './console'
console.log(console === require('./console').default)
