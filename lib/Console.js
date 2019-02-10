
import Out from './Out'

export default function Console (...args)
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

	var console = {}

	var stdout = (options.stdout || process.stdout)
	var stderr = (options.stderr || process.stderr)

	// var ignore_errors = (options.ignoreErrors || options.ignore_errors || true)
	var colors = (options.colorMode || options.colors || 'auto')
	var inspect_with = (options.inspectOptions || options.inspect_with || {})
	inspect_with = { ...inspect_with, colors }

	var { log, warn, info, dir } = Out({ inspect_with, stdout })

	console.log  = log
	console.warn = warn
	console.info = info
	console.dir  = dir

	return console
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
