
import { inspect } from 'util'

import { reset, yellow, blue } from 'kleur'

import Name from 'function-name'

import Thru from './Thru'
import is_colors from './is-colors'
import prefix from './prefix'
import indent from './indent'
import Logformat from './logformat'
import { dot } from './unicode'


export default function Out ({ inspect_with, writer })
{
	var stream = writer.stream

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
	var warn = Log({ name: 'warn', px: dot, color: yellow })
	var info = Log({ name: 'info', px: dot, color: blue })

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

	return { log, warn, info, dir }
}
