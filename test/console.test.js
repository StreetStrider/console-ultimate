
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
		output: '\u001b[0m ⚫ \u001b[33m1\u001b[39m\u001b[0m\n\u001b[33m ⚫ \u001b[33m2\u001b[33m\u001b[39m\n\u001b[34m ⚫ \u001b[33m3\u001b[34m\u001b[39m\n',
		test (console)
		{
			console.log(1)
			console.warn(2)
			console.info(3)
		},
	})
})

function it_console ({ isTTY, title, options = {}, output, test })
{
	if (! title) { return }

	it(title, async () =>
	{
		await test_console(isTTY, options, output, test)
	})
}

async function test_console (isTTY, options, output, test)
{
	var [ stdout, result ] = cat()

	if (isTTY)
	{
		stdout.isTTY = isTTY
	}

	var console = Console({ ...options, stdout })

	test(console)
	stdout.end()

	expect(await result).eq(output)
}
