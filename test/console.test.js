
import Console from '../lib/Console'

import cat from './cat'

describe('console', () =>
{
	it('log', async () =>
	{
		test_console({}, ' ⚫ 1\n', (console) =>
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
