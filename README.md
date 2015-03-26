# console-ultimate

Node-compatible `console` object with extra features. Replace default one with this and you'll have nice styles and advanced features out of the box. Features include: timers, terminal clear, customizable styles and behavior for every function, on-off options for every additional function and other.

# install
```sh
npm install console-ultimate
# or
npm install StreetStrider/console-ultimate
```

# usage
```javascript
var Console = require('console-ultimate');
var console;

console = new Console(process.stdout, process.stderr);
// or:
console = Console(process.stdout, process.stderr);
// or just (if default std streams):
console = Console();

console.log('...');
```
`Console.colors` and any console instance `.colors` property is a ref to [cli-color](https://github.com/medikoo/cli-color). It can be used for customizing output styles.

```javascript
console = Console(null, null, {
  styling: {
    log: {
      color: console.colors.bold
    }
  }
});

console.log('...'); // output is bold now
```

# todo

* features:
  * [x] log, info, warn, error
  * [x] dir
  * [x] clear
  * [x] count
  * [x] debug
  * [x] time, timeEnd
    * [x] hrtime
    * [x] retrieve
  * [ ] trace
  * [x] assert
  * [ ] table
  * [ ] group, groupEnd
* options & feature gates:
  * [x] colors: turn on|off, advanced styling
  * [x] mapping method → stream (stdout or stderr)
  * [x] per-method feature gate
  * [x] logger's prefixes
* console variations:
  * [ ] console/global — path global `console`
  * [ ] console/proxy — proxy calls to another console instance
  * [ ] null-console — silent console
* [ ] browserify
* [ ] better stack traces (research)

# license
MIT, copyright © 2015 StreetStrider.
