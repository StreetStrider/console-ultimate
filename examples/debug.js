

var console, Console = require('..');

console = Console();

console.log('this is `log`');
console.debug('this is `debug`');

console.options.styling = { log: { color: console.colors.bold }};
console.log('restyling `log`');
console.debug('`debug` is an alias of log');
