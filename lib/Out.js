
import { inspect } from 'node:util'

import kleur from 'kleur'
const { reset, green, blue, magenta, cyan } = kleur

import Name from 'function-name'

import Thru from './Thru.js'
import is_colors from './is-colors.js'
import prefix from './prefix.js'
import indent from './indent.js'
import Logformat from './Logformat.js'
import { dot } from './unicode.js'


export default function Out ({ inspect_with, writer })
{
	var { stream } = writer

	function dir (data, options)
	{
		options = { ...inspect_with, ...options }
		options.colors = is_colors(options.colors, stream)

		var _ = inspect(data, options)
		_ = prefix(dot, _)
		_ = indent(_)

		writer(_)
	}

	dir.thru = dir._ = Thru(dir)

	var log  = Log({ name: 'log',  px: dot, color: reset })
	var warn = Log({ name: 'warn', px: dot, color: green })
	var info = Log({ name: 'info', px: dot, color: blue })

	var debug  = Log({ name: 'debug',  px: dot, color: magenta })
	var dirxml = Log({ name: 'dirxml', px: dot, color: cyan })

	function Log ({ name, px, color })
	{
		var lf = Logformat({ stream, px, color, inspect_with, })

		var f = function (...args)
		{
			writer(lf(args))
		}

		Name(f, name)

		f.thru = f._ = Thru(f)

		return f
	}

	return { log, warn, info, dir, debug, dirxml }
}
