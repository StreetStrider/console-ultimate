
import it_console from './it-console'

describe('console', () =>
{
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
		do_stderr: true,
		title: 'error primitive',
		output: ' ⚫ 4\n',
		test (console)
		{
			console.error(4)
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

	it_console(
	{
		title: 'printf',
		options: { colors: false },
		output: ' ⚫ 1 2 3\n ⚫ 1 2 %s\n',
		test (console)
		{
			console.log('%s %s', 1, 2, 3)
			console.log('%s %s %s', 1, 2)
		},
	})
	it_console(
	{
		title: 'printf log, warn, info',
		options: { colors: false },
		output: ' ⚫ 1 2 3\n ⚫ 1 2 3\n ⚫ 1 2 3\n',
		test (console)
		{
			console.log('%s %s', 1, 2, 3)
			console.warn('%s %s', 1, 2, 3)
			console.info('%s %s', 1, 2, 3)
		},
	})
	it_console(
	{
		do_stderr: true,
		title: 'printf error',
		options: { colors: false },
		output: ' ⚫ 1 2 3\n',
		test (console)
		{
			console.error('%s %s', 1, 2, 3)
		},
	})
	it_console(
	{
		isTTY: true,
		title: 'printf log, warn, info',
		output: '\u001b[0m ⚫ 1 2 \u001b[33m3\u001b[39m\u001b[0m\n\u001b[33m ⚫ 1 2 \u001b[33m3\u001b[33m\u001b[39m\n\u001b[34m ⚫ 1 2 \u001b[33m3\u001b[34m\u001b[39m\n',
		test (console)
		{
			console.log('%s %s', 1, 2, 3)
			console.warn('%s %s', 1, 2, 3)
			console.info('%s %s', 1, 2, 3)
		},
	})
	it_console(
	{
		do_stderr: true,
		isTTY: true,
		title: 'printf error',
		output: '\u001b[31m ⚫ 1 2 \u001b[33m3\u001b[31m\u001b[39m\n',
		test (console)
		{
			console.error('%s %s', 1, 2, 3)
		},
	})

	// Dir
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
		title: 'dir',
		output: ' ⚫ 1\n\u001b[2J\u001b[0;0H',
		test (console)
		{
			console.log(1)
			console.clear()
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
