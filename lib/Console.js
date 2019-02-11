
import { coalesce } from 'object-path'

import Out from './Out'
import Err from './Err'


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
var ignore_errors = coalesce(options, [ 'ignoreErrors', 'ignore_errors' ], true)
	*/
	var colors = coalesce(options, [ 'colorMode', 'colors' ], 'auto')
	var inspect_with = coalesce(options, [ 'inspectOptions', 'inspect_with' ])
	inspect_with = { ...defaults, ...inspect_with, colors }

	var console = {}

	var { log, warn, info, dir } = Out({ inspect_with, stdout })

	console.log  = log
	console.warn = warn
	console.info = info
	console.dir  = dir

	console.error = Err({ inspect_with, stderr })

	console.clear = Clear(stdout)

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
