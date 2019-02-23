
[![Travis](https://img.shields.io/travis/StreetStrider/console-ultimate.svg?style=flat-square)](https://travis-ci.org/StreetStrider/console-ultimate)

# install

Currently v2 is stable. Install it:

```
npm i console-ultimate
```

# usage

```js
/* replace console instance globally */
import 'console-ultimate'

/* instance with default options */
import console from 'console-ultimate'

/* instance with default options (not replacing global instance) */
import console from 'console-ultimate/console'

/* upgrade global instance with certain options */
import upgrade from 'console-ultimate/upgrade'

upgrade({ stdout })


/* instantiate your own custom instance
   via Console, a Node-compatible constructor */
import Console from 'console-ultimate/Console'

let console = Console({ stdout })

console.log(console)
```

# todo
Work in progress on modern v3.

Now porting features, to catch up with v2:

* features:
  * [x] log, info, warn, error
  * [x] dir
    * [ ] advanced flags (like `hidden` & `noinspect`) (https://nodejs.org/api/util.html#util_util_inspect_object_options)
  * [x] clear
  * [ ] count
  * [ ] debug
  * [ ] time, timeEnd
    * [ ] hrtime (with [pretty-hrtime](https://github.com/robrich/pretty-hrtime))
    * [ ] retrieve
  * [x] trace
    * [x] purified stack traces
  * [ ] assert
  * [x] table
    * [ ] table props
  * [x] group, groupEnd
    * [x] bordered
    * [x] group.end alias
  * [x] fp-friendly loggers (log, dir, warn, info, error) via `log.thru`, `dir.thru` etc…
  * [ ] logger partials via `log.part`
  * [ ] inspect values with `dir.retrieve`
* options:
  * [x] colors: `true | false |'tty'`
  * [x] works properly if redirected to pipe or file (check for TTY)
  * [ ] `ignoreErrors`
* console variations:
  * [x] console/global — replace global `console` with `console-ultimate` instance
  * [ ] console/global-patch - patch global `console` to make all functions, captured old `console` work with `console-ultimate`
  * [ ] console/proxy — proxy calls to another console instance
  * [ ] null-console — silent console
* [ ] browser-friendly version or noop (return standard browser console)
* [x] tests
* [ ] remote consoles, node-inspector integration (research)
* [ ] ansi word-wrap

# license
ISC, © 2019 Strider.
