

var Console = require('..')

var console = Console(null, null,
{
	features:
	{
		trace:
		{
			// advanced: false /* turn-off advanced (async) stack traces */
		}
	}
})

F('some_value')

function F (v)
{
	T(v)
}

function T (v)
{
	setTimeout(W.bind(null, v), 100)
}

function W (v)
{
	console.trace('thats_wrong: %s', v)
}
