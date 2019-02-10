
import Console from '../lib/Console'

import cat from './cat'

describe('console', () =>
{
	it('log', async () =>
	{
		await test_console({}, ' ⚫ 1\n', (console) =>
		{
			console.log(1)
		})
	})
	it('colors = true, tty = false', async () =>
	{
		await test_console({ colors: true }, '\u001b[0m ⚫ \u001b[33m1\u001b[39m\u001b[0m\n',
		(console) =>
		{
			console.log(1)
		})
	})
})

async function test_console (options, output, test)
{
	var [ stdout, result ] = cat()

	var console = Console({ ...options, stdout })

	test(console)
	stdout.end()

	expect(await result).eq(output)
}
