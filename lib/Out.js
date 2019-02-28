
import { inspect } from 'util'

import { reset, green, blue, magenta, cyan } from 'kleur'

import Name from 'function-name'

import Thru from './Thru'
import is_colors from './is-colors'
import prefix from './prefix'
import indent from './indent'
import Logformat from './Logformat'
import { dot } from './unicode'


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
