
import Console from 'console-ultimate/Console'

describe('stream', () =>
{
	Console()

	it('print buffer', () =>
	{
		process.stdout.write(Buffer.from('\n'))
	})
})
