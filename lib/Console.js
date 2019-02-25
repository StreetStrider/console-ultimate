/* eslint-disable max-statements */

var noop = () => void 0

import { coalesce } from 'object-path'

import Writer from './Writer'
import Out from './Out'
import Err from './Err'
import Group from './Group'
import Table from './Table'
import Internal from './Internal'


var defaults =
{
	depth: 1,
}

export default function Console (...args)
{
	var options = Options(...args)

	var stdout = Writer(options.stdout || process.stdout)
	var stderr = Writer(options.stderr || process.stderr)

	/* eslint-disable max-len */
	/*
https://github.com/nodejs/node/blob/771b2901daae2e4389d157c18bb0f6674a0a19a4/lib/internal/console/constructor.js#L230-L249
https://github.com/nodejs/node/blob/771b2901daae2e4389d157c18bb0f6674a0a19a4/lib/internal/errors.js#L474-L483

var ignore_errors = coalesce(options, [ 'ignoreErrors', 'ignore_errors' ], true)
	*/
	var colors = coalesce(options, [ 'colorMode', 'colors' ], 'auto')
	var inspect_with = coalesce(options, [ 'inspectOptions', 'inspect_with' ])
	inspect_with = { ...defaults, ...inspect_with, colors }

	var console = { Console }

	var out = Out({ inspect_with, writer: stdout })
	var { log, warn, info, dir } = out
	var { debug, dirxml } = out

	console.log  = log
	console.warn = warn
	console.info = info
	console.dir  = dir

	console.debug  = debug
	console.dirxml = dirxml

	var { error, trace } = Err({ inspect_with, writer: stderr })

	console.error = error
	console.trace = trace

	console.clear = Clear(stdout)

	var { group, group: groupCollapsed, groupEnd } = Group({ inspect_with, stdout, stderr })

	console.group = group
	console.groupCollapsed = groupCollapsed
	console.groupEnd = groupEnd

	console.assert = Assert(warn)

	/* = */
	console.time =
	console.timeLog =
	console.timeEnd = noop

	console.count =
	console.countReset = noop

	console.table = Table({ inspect_with, dir, writer: stdout })

	/* inspector */
	console.timeline = Internal('timeline')
	console.markTimeline = Internal('markTimeline')
	console.timeStamp = Internal('timeStamp')
	console.timelineEnd = Internal('timelineEnd')

	console.profile = Internal('profile')
	console.profileEnd = Internal('profileEnd')

	/* ? */
	console.context = noop

	return console
}


function Options (...args)
{
	if (is_compability(...args))
	{
		var [ stdout, stderr, ignoreErrors ] = args
		var options = { stdout, stderr, ignoreErrors }
	}
	else if (is_object(...args))
	{
		var options = (args[0] || {})
	}
	else if (is_nothing(...args))
	{
		var options = {}
	}
	else
	{
		throw new TypeError('console-ultimate/unknown_init')
	}

	return options
}


import { Writable } from 'stream'

function is_compability (...args)
{
	if (args.length === 1)
	{
		return (args[0] instanceof Writable)
	}
	else if (args.length >= 2)
	{
		if (! (args[0] instanceof Writable)) return
		if (! (args[1] instanceof Writable)) return
		return true
	}
}

function is_object (...args)
{
	if (args.length === 1)
	{
		return (typeof args[0] === 'object')
	}
}

function is_nothing (...args)
{
	return (! args.length)
}


function Clear (writer)
{
	return function clear ()
	{
		if (writer.stream.isTTY)
		{
			writer.stream.write('\u001b[2J\u001b[0;0H')
		}
	}
}


function Assert (warn)
{
	return function assert (expr, ...args)
	{
		if (! expr)
		{
			var _ = ''

			if (args.length)
			{
				_ = ' ' + args[0]
			}

			args[0] = `Assertion failed:${ _ }`

			warn(...args)
		}
	}
}
