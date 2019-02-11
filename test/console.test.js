
import Console from '../lib/Console'

import cat from './cat'

describe('console', () =>
{
	it_console(
	{
	})

	it_console(
	{
		title: 'log',
		output: ' ⚫ 1\n',
		test (console)
		{
			console.log(1)
		},
	})

	//
	it_console(
	{
		title: 'colors = true, tty = false',
		options: { colors: true },
		output: '\u001b[0m ⚫ \u001b[33m1\u001b[39m\u001b[0m\n',
		test (console)
		{
			console.log(1)
		},
	})

	it_console(
	{
		title: 'colors = auto, tty = false',
		options: { colors: 'auto' },
		output: ' ⚫ 1\n',
		test (console)
		{
			console.log(1)
		},
	})

	it_console(
	{
		title: 'colors = false, tty = false',
		options: { colors: false },
		output: ' ⚫ 1\n',
		test (console)
		{
			console.log(1)
		},
	})

	it_console(
	{
		isTTY: true,
		title: 'tty = true',
		output: '\u001b[0m ⚫ \u001b[33m1\u001b[39m\u001b[0m\n',
		test (console)
		{
			console.log(1)
		},
	})

	it_console(
	{
		isTTY: true,
		title: 'colors = true, tty = true',
		options: { colors: true },
		output: '\u001b[0m ⚫ \u001b[33m1\u001b[39m\u001b[0m\n',
		test (console)
		{
			console.log(1)
		},
	})

	it_console(
	{
		isTTY: true,
		title: 'colors = auto, tty = true',
		options: { colors: 'auto' },
		output: '\u001b[0m ⚫ \u001b[33m1\u001b[39m\u001b[0m\n',
		test (console)
		{
			console.log(1)
		},
	})

	it_console(
	{
		isTTY: true,
		title: 'colors = false, tty = true',
		options: { colors: false },
		output: ' ⚫ 1\n',
		test (console)
		{
			console.log(1)
		},
	})

	it_console(
	{
		title: 'indent log',
		output: ' ⚫ 1\n   2\n   3\n',
		test (console)
		{
			console.log('1\n2\n3')
		},
	})

	it_console(
	{
		title: 'indent dir',
		// eslint-disable-next-line max-len
		output: ' ⚫ [ \'global\',\n     \'process\',\n     \'Buffer\',\n     \'clearImmediate\',\n     \'clearInterval\',\n     \'clearTimeout\',\n     \'setImmediate\',\n     \'setInterval\',\n     \'setTimeout\',\n     \'expect\',\n     \'before\',\n     \'after\',\n     \'beforeEach\',\n     \'afterEach\',\n     \'run\',\n     \'context\',\n     \'describe\',\n     \'xcontext\',\n     \'xdescribe\',\n     \'specify\',\n     \'it\',\n     \'xspecify\',\n     \'xit\' ]\n',
		test (console)
		{
			console.dir(Object.keys(global))
		},
	})

	//
	it_console(
	{
		title: 'log, warn, info',
		output: ' ⚫ 1\n ⚫ 2\n ⚫ 3\n',
		test (console)
		{
			console.log(1)
			console.warn(2)
			console.info(3)
		},
	})

	it_console(
	{
		do_stderr: true,
		title: 'error prim',
		output: ' ⚫ 4\n',
		test (console)
		{
			console.error(4)
		},
	})

	it_console(
	{
		isTTY: true,
		title: 'log, warn, info',
		// eslint-disable-next-line max-len
		output: '\u001b[0m ⚫ \u001b[33m1\u001b[39m\u001b[0m\n\u001b[33m ⚫ \u001b[33m2\u001b[33m\u001b[39m\n\u001b[34m ⚫ \u001b[33m3\u001b[34m\u001b[39m\n',
		test (console)
		{
			console.log(1)
			console.warn(2)
			console.info(3)
		},
	})

	it_console(
	{
		isTTY: true,
		do_stderr: true,
		title: 'error prim',
		output: '\u001b[31m ⚫ \u001b[33m4\u001b[31m\u001b[39m\n',
		test (console)
		{
			console.error(4)
		},
	})

	//
	it_console(
	{
		title: 'dir',
		output: ' ⚫ 1\n',
		test (console)
		{
			console.dir(1)
		},
	})

	it_console(
	{
		isTTY: true,
		title: 'dir',
		output: ' ⚫ \u001b[33m1\u001b[39m\n',
		test (console)
		{
			console.dir(1)
		},
	})

	//
	it_console(
	{
		do_stderr: true,
		title: 'error',
		output (output)
		{
			output.split('\n').forEach((line, n) =>
			{
				if (! n)
				{
					expect(line).eq(' ⚫ Error:')
					return
				}

				if (! line)
				{
					return
				}

				expect(line).match(/^   • (.+ \(.+:\d+:\d+\)|.+:\d+:\d+)$/)
			})
		},
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
		title: 'error',
		output (output)
		{
			output.split('\n').forEach((line, n) =>
			{
				if (! n)
				{
					expect(line).eq('\u001b[31m ⚫ Error:\u001b[39m')
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

				expect(line).match(/^.*   • (.+ \(.+:\d+:\d+\)|.+:\d+:\d+).*$/)
			})
		},
		test (console)
		{
			var e = new Error
			console.error(e)
		},
	})
})

function it_console ({ isTTY, do_stderr, title, options = {}, output, test })
{
	if (! title) { return }

	it(title, async () =>
	{
		await test_console({ isTTY, do_stderr, options, output, test })
	})
}

async function test_console ({ isTTY, do_stderr, options, output, test })
{
	var [ stdout, result ] = cat()

	if (isTTY)
	{
		stdout.isTTY = isTTY
	}

	if (do_stderr)
	{
		options = { ...options, stderr: stdout }
	}
	else
	{
		options = { ...options, stdout }
	}

	var console = Console(options)

	test(console)
	stdout.end()

	if (typeof output === 'function')
	{
		output(await result)
	}
	else
	{
		expect(await result).eq(output)
	}
}
