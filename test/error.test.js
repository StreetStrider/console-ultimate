
import it_console from './it-console.js'

describe('console.error, console.trace', () =>
{
	it_console(
	{
		do_stderr: true,
		title: 'error',
		output: test_trace(
		{
			head (line)
			{
				expect(line).eq(' ⚫ Error:')
			},
			body (line)
			{
				expect(line).match(/^   • (.+ \(.+:\d+:\d+\)|.+:\d+:\d+)$/)
			}
		}),
		test (console)
		{
			var e = new Error
			console.error(e)
		},
	})

	it_console(
	{
		isTTY: true,
		do_stderr: true,
		title: 'error color',
		output: test_trace(
		{
			head (line)
			{
				expect(line).eq('\u001b[31m ⚫ Error:\u001b[39m')
			},
			body (line)
			{
				expect(line).match(/^.*   • (.+ \(.+:\d+:\d+\)|.+:\d+:\d+).*$/)
			}
		}),
		test (console)
		{
			var e = new Error
			console.error(e)
		},
	})

	it_console(
	{
		isTTY: true,
		do_stderr: true,
		title: 'trace',
		output: test_trace(
		{
			head (line)
			{
				expect(line).eq('\u001b[31m ⚫ Trace:\u001b[39m')
			},
			body (line)
			{
				expect(line).match(/^.*   • (.+ \(.+:\d+:\d+\)|.+:\d+:\d+).*$/)
			}
		}),
		test (console)
		{
			console.trace()
		},
	})
})

function test_trace ({ head, body })
{
	return (output) =>
	{
		output.split('\n').forEach((line, n) =>
		{
			if (! n)
			{
				head(line)
				return
			}

			if (! line)
			{
				return
			}

			if (! line)
			{
				return
			}
			if (line === '\u001b[39m')
			{
				return
			}

			body(line)
		})
	}
}
