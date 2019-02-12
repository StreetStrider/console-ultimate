
var noop = () => void 0

import { coalesce } from 'object-path'

import Out from './lib/Out'
import Err from './lib/Err'


var defaults =
{
	depth: 1,
}

export default function Console (...args)
{
	var options = Options(...args)

	var stdout = (options.stdout || process.stdout)
	var stderr = (options.stderr || process.stderr)

	/*
https://github.com/nodejs/node/blob/771b2901daae2e4389d157c18bb0f6674a0a19a4/lib/internal/console/constructor.js#L230-L249
https://github.com/nodejs/node/blob/771b2901daae2e4389d157c18bb0f6674a0a19a4/lib/internal/errors.js#L474-L483

var ignore_errors = coalesce(options, [ 'ignoreErrors', 'ignore_errors' ], true)
	*/
	var colors = coalesce(options, [ 'colorMode', 'colors' ], 'auto')
	var inspect_with = coalesce(options, [ 'inspectOptions', 'inspect_with' ])
	inspect_with = { ...defaults, ...inspect_with, colors }

	var console = { Console }

	var { log, warn, info, dir } = Out({ inspect_with, stdout })

	console.log  = log
	console.warn = warn
	console.info = info
	console.dir  = dir

	console.error = Err({ inspect_with, stderr })

	console.clear = Clear(stdout)

	console.debug  =
	console.dirxml = log

	console.time =
	console.timeEnd = noop

	console.trace = noop
	console.assert = noop

	console.count =
	console.countReset = noop

	console.group =
	console.groupCollapsed =
	console.groupEnd = noop

	console.table = noop

	console.timeline =
	console.markTimeline =
	console.timeStamp =
	console.timelineEnd = noop

	console.profile =
	console.profileEnd = noop

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


function Clear (stdout)
{
	return function clear ()
	{
		stdout.write('\u001b[2J\u001b[0;0H')
	}
}
