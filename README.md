# console-ultimate
[![wow](assets/banner.png)](https://www.npmjs.com/package/console-ultimate)

Node-compatible `console` object with extra features. Replace default one with this and you'll have nice styles and advanced features out of the box. Features include: timers, terminal clear, customizable styles and behavior for every function, on-off options for every additional function and other.

All Node-related features are enabled by default and can be noop-ed if required. Any additional feature can be easily turned on and customized.

Now all Node-related features is **implemented** and this module can be used as **drop-in** replacement for **standard console**.


## install
```sh
npm install console-ultimate
# or
npm install StreetStrider/console-ultimate
```


## usage
### instantiate

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

The third parameter can be used to pass any options.
```javascript
Console(stdout, stderr, options)
```


### styling
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


### patch global console
```javascript
require('console-ultimate/global').replace();
```
`global.console` is replaced with `console-ultimate` instance.

### features
Addtional features are managed by feature-gates. All features are enabled by default, but can be turned off or tuned.
```javascript
console = Console(null, null, {
  features:
  {
    debug: false, /* disable `debug` alias */
    // clear: true, /* feature is enabled by default */

    timer:
    {
      // hrtime: true /* tune timers to use hi-precision time */
      // enabled by default
    }
});
```

### examples
You can find feature-by-feature examples in `examples/` directory.


## todo
Work on features is not come to end. Many additional interesting features, such as ansi-tables and grouping will arrive. Also, tests will be required if any interest to this module occur.

* features:
  * [x] log, info, warn, error
  * [x] dir
  * [x] clear
  * [x] count
  * [x] debug
  * [x] time, timeEnd
    * [x] hrtime (with [pretty-hrtime](https://github.com/robrich/pretty-hrtime))
    * [x] retrieve
  * [x] trace
    * [x] better stack traces ([trace](https://github.com/AndreasMadsen/trace) + [clarify](https://github.com/AndreasMadsen/clarify))
  * [x] assert
  * [x] table
    * [ ] table with 2nd argument
    * [ ] advanced styling
  * [ ] group, groupEnd
  * [ ] logger partials
* options & feature gates:
  * [x] colors: turn on|off, advanced styling
  * [x] mapping method → stream (stdout or stderr)
  * [x] per-method feature gate
  * [x] logger's prefixes
* console variations:
  * [x] console/global — replace global `console` with `console-ultimate` instance
  * [ ] console/global-patch - patch global `console` to make all functions, captured old `console` work with `console-ultimate`
  * [ ] console/proxy — proxy calls to another console instance
  * [ ] null-console — silent console
* [ ] browserify
* [ ] tests :)
* [ ] remote consoles, node-inspector integration (research)

# license
MIT, copyright © 2015 StreetStrider.
