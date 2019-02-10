
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
})

function it_console ({ title, options = {}, output, test })
{
	if (! title) { return }

	it(title, async () =>
	{
		await test_console(options, output, test)
	})
}

async function test_console (options, output, test)
{
	var [ stdout, result ] = cat()

	var console = Console({ ...options, stdout })

	test(console)
	stdout.end()

	expect(await result).eq(output)
}
