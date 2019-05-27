
import Console from '../Console'

import cat from './cat'

export default function it_console (options)
{
	var { title } = options

	if (! title) { return }

	it(title, async () =>
	{
		await test_console(options)
	})
}

async function test_console ({ isTTY, trim, do_stderr, options, output, test })
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

	result = await result

	if (trim)
	{
		result = result.replace(/\s/g, '')
		output = output.replace(/\s/g, '')
	}

	if (typeof output === 'function')
	{
		output(await result)
	}
	else
	{
		expect(await result).eq(output)
	}
}
