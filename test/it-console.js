
import Console from '../Console'

import cat from './cat'

export default function it_console ({ isTTY, do_stderr, title, options = {}, output, test })
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

	test(console, options)
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
