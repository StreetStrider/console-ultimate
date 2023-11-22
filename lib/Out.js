
import { inspect } from 'node:util'

import kleur from 'kleur'
var { reset, green, blue, magenta, cyan } = kleur

import Name from 'function-name'

import { Thru, As, Thru1 } from './Thru.js'
import is_colors from './is-colors.js'
import prefix from './prefix.js'
import sps from './spaced.js'
import indent from './indent.js'
import Logformat from './Logformat.js'
import * as unicode from './unicode.js'


export default function Out ({ inspect_with, writer })
{
	var { stream } = writer

	function dir (data, options)
	{
		options = { ...inspect_with, ...options }
		options.colors = is_colors(options.colors, stream)

		var _ = inspect(data, options)
		_ = prefix(sps(unicode.log), _)
		_ = indent(_)

		writer(_)
	}

	dir.thru = Thru1(dir)

	var log  = Log({ name: 'log',  px: unicode.log, color: reset })
	var warn = Log({ name: 'warn', px: unicode.log, color: green })
	var info = Log({ name: 'info', px: unicode.log, color: blue })

	var debug  = Log({ name: 'debug',  px: unicode.log, color: magenta })
	var dirxml = Log({ name: 'dirxml', px: unicode.log, color: cyan })

	function Log ({ name, px, color })
	{
		var lf = Logformat({ stream, px: sps(px), color, inspect_with })

		var f = function (...args)
		{
			writer(lf(args))
		}

		Name(f, name)

		f.thru = Thru(f)
		f.as = As(f)

		return f
	}

	return { log, warn, info, dir, debug, dirxml }
}
