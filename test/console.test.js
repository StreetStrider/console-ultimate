
import it_console from './it-console.js'

describe('console', () =>
{
	it_console(
	{
		title: 'log',
		output: ' ⬤ 1\n',
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
		output: '\u001b[0m ⬤ \u001b[33m1\u001b[39m\u001b[0m\n',
		test (console)
		{
			console.log(1)
		},
	})

	it_console(
	{
		title: 'colors = auto, tty = false',
		options: { colors: 'auto' },
		output: ' ⬤ 1\n',
		test (console)
		{
			console.log(1)
		},
	})

	it_console(
	{
		title: 'colors = false, tty = false',
		options: { colors: false },
		output: ' ⬤ 1\n',
		test (console)
		{
			console.log(1)
		},
	})

	it_console(
	{
		isTTY: true,
		title: 'tty = true',
		output: '\u001b[0m ⬤ \u001b[33m1\u001b[39m\u001b[0m\n',
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
		output: '\u001b[0m ⬤ \u001b[33m1\u001b[39m\u001b[0m\n',
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
		output: '\u001b[0m ⬤ \u001b[33m1\u001b[39m\u001b[0m\n',
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
		output: ' ⬤ 1\n',
		test (console)
		{
			console.log(1)
		},
	})

	it_console(
	{
		title: 'indent log',
		output: ' ⬤ 1\n   2\n   3\n',
		test (console)
		{
			console.log('1\n2\n3')
		},
	})

	it_console(
	{
		title: 'indent log massive',
		trim: true,
		output: ' ⬤ [\n     \'global\',\n     \'process\',\n     \'Buffer\',\n     \'clearImmediate\',\n     \'clearInterval\',\n     \'clearTimeout\',\n     \'setImmediate\',\n     \'setInterval\',\n     \'setTimeout\'\n   ]\n',
		test (console)
		{
			console.dir(
			[
				'global',
				'process',
				'Buffer',
				'clearImmediate',
				'clearInterval',
				'clearTimeout',
				'setImmediate',
				'setInterval',
				'setTimeout',
			])
		},
	})

	it_console(
	{
		title: 'indent dir massive',
		trim: true,
		output: ' ⬤ [\n     \'global\',\n     \'process\',\n     \'Buffer\',\n     \'clearImmediate\',\n     \'clearInterval\',\n     \'clearTimeout\',\n     \'setImmediate\',\n     \'setInterval\',\n     \'setTimeout\'\n   ]\n',
		test (console)
		{
			console.dir(
			[
				'global',
				'process',
				'Buffer',
				'clearImmediate',
				'clearInterval',
				'clearTimeout',
				'setImmediate',
				'setInterval',
				'setTimeout',
			])
		},
	})

	//
	it_console(
	{
		title: 'log, warn, info',
		output: ' ⬤ 1\n ⬤ 2\n ⬤ 3\n',
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
		output: '\u001b[0m ⬤ \u001b[33m1\u001b[39m\u001b[0m\n\u001b[32m ⬤ \u001b[33m2\u001b[39m\u001b[32m\u001b[39m\n\u001b[34m ⬤ \u001b[33m3\u001b[39m\u001b[34m\u001b[39m\n',
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
		title: 'debug, dirxml',
		output: '\u001b[0m ⬤ \u001b[33m1\u001b[39m\u001b[0m\n\u001b[35m ⬤ \u001b[33m2\u001b[39m\u001b[35m\u001b[39m\n\u001b[36m ⬤ \u001b[33m3\u001b[39m\u001b[36m\u001b[39m\n',
		test (console)
		{
			console.log(1)
			console.debug(2)
			console.dirxml(3)
		},
	})

	it_console(
	{
		do_stderr: true,
		title: 'error primitive',
		output: ' ⬤ 4\n',
		test (console)
		{
			console.error(4)
		},
	})
	it_console(
	{
		isTTY: true,
		do_stderr: true,
		title: 'error primitive',
		output: '\u001b[31m ⬤ \u001b[33m4\u001b[39m\u001b[31m\u001b[39m\n',
		test (console)
		{
			console.error(4)
		},
	})

	it_console(
	{
		title: 'printf',
		options: { colors: false },
		output: ' ⬤ 1 2 3\n ⬤ 1 2 %s\n',
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
		output: ' ⬤ 1 2 3\n ⬤ 1 2 3\n ⬤ 1 2 3\n',
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
		output: ' ⬤ 1 2 3\n',
		test (console)
		{
			console.error('%s %s', 1, 2, 3)
		},
	})
	it_console(
	{
		isTTY: true,
		title: 'printf log, warn, info',
		output: '\u001b[0m ⬤ 1 2 \u001b[33m3\u001b[39m\u001b[0m\n\u001b[32m ⬤ 1 2 \u001b[33m3\u001b[39m\u001b[32m\u001b[39m\n\u001b[34m ⬤ 1 2 \u001b[33m3\u001b[39m\u001b[34m\u001b[39m\n',
		test (console)
		{
			console.log('%s %s', 1, 2, 3)
			console.warn('%s %s', 1, 2, 3)
			console.info('%s %s', 1, 2, 3)
		},
	})
	it_console(
	{
		isTTY: true,
		title: 'printf log variants',
		output: '\u001b[0m ⬤ 1 2 3\u001b[0m\n\u001b[0m ⬤ 1 2 \u001b[33m3\u001b[39m\u001b[0m\n\u001b[0m ⬤ 1 2 { x: \u001b[33m3\u001b[39m }\u001b[0m\n',
		test (console)
		{
			console.log('%s %s %s', 1, 2, 3)
			console.log('%s %s', 1, 2, 3)
			console.log('%s %s', 1, 2, { x: 3 })
		},
	})
	it_console(
	{
		do_stderr: true,
		isTTY: true,
		title: 'printf error',
		output: '\u001b[31m ⬤ 1 2 \u001b[33m3\u001b[39m\u001b[31m\u001b[39m\n',
		test (console)
		{
			console.error('%s %s', 1, 2, 3)
		},
	})

	// Dir
	it_console(
	{
		title: 'dir',
		output: ' ⬤ 1\n',
		test (console)
		{
			console.dir(1)
		},
	})

	it_console(
	{
		isTTY: true,
		title: 'dir',
		output: ' ⬤ \u001b[33m1\u001b[39m\n',
		test (console)
		{
			console.dir(1)
		},
	})

	//
	it_console(
	{
		title: 'clear',
		output: ' ⬤ 1\n',
		test (console)
		{
			console.log(1)
			console.clear()
		},
	})
	it_console(
	{
		isTTY: true,
		title: 'clear tty',
		output: '\u001b[0m ⬤ \u001b[33m1\u001b[39m\u001b[0m\n\u001b[2J\u001b[0;0H',
		test (console)
		{
			console.log(1)
			console.clear()
		},
	})
})
