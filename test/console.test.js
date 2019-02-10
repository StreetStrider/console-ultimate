
import Console from '../lib/Console'

import cat from './cat'

describe('console', () =>
{
	it('log', async () =>
	{
		var [ s, p ] = cat()

		var console = Console({ stdout: s })

		console.log(1)
		s.end()

		expect(await p).eq(' ⚫ 1\n')
	})
})
