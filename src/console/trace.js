
var noop = require('aux.js/noop')
var get  = require('object-path').get
var PE   = require('pretty-error')

var isOn   = require('../feature').isOn
var format = require('../format').format

module.exports = function (console)
{
	if (isOn(console, 'trace'))
	{
		setup(console)
	}
	else
	{
		stub(console)
	}
}

function setup (console)
{
	var isAdvanced = get(console.options, 'features.trace.advanced', true)

	if (isAdvanced)
	{
		var pe = new PE()

		pe.appendStyle(
		{
			'pretty-error':
			{
				color: 'black',
				marginLeft: 1,
			},
			'pretty-error > header > title > kind':
			{
				color: 'red',
				background: 'bright-white'
			},
			'pretty-error > trace > item > header > pointer > file':
			{
				color: 'red'
			},
			'pretty-error > trace > item':
			{
				bullet: '"<grey>•</grey>"'
			},
			'pretty-error > trace > item > header > pointer > line':
			{
				color: 'red',
			},
			'pretty-error > trace > item > header > what':
			{
				color: 'black'
			}
		})

		console.trace = function trace ()
		{
			var error = produce(arguments, trace)

			console.writer.writeln('stdout', pe.render(error))
		}
	}
	else
	{
		console.trace = function trace ()
		{
			var error = produce(arguments, trace)

			console.error(error.stack)
		}
	}
}

function produce (args, trace)
{
	var error = new Error(format(args))

	error.name = 'Trace'
	Error.captureStackTrace(error, trace)

	return error
}

function stub (console)
{
	console.trace = noop
}
