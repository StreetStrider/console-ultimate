# console-ultimate

> Compatible with node `console` replacement with extra features.

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

# todo

* [x] log, info, warn, error
* [x] dir
* [ ] time, timeEnd
* [ ] trace
* [ ] assert
* [ ] console/global — path global `console`
* [ ] console/proxy — proxy calls to another console instance
* [ ] options & feature gates:

  * [ ] colors: turn on|off, advanced styling
  * [ ] mapping method → stream (stdout or stderr)
  * [ ] per-method feature gate

* [ ] table
* [ ] null-console — silent console
* [ ] clear
* [ ] count
* [ ] debug
* [ ] browserify

# license
MIT, copyright © 2015 StreetStrider.
