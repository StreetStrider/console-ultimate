
import $console from 'console'
import Console from 'console-ultimate/Console'

describe('conformance', () =>
{
	var console = Console()

	it('all methods present', () =>
	{
		for (let key in $console)
		{
			expect(typeof $console[key]).eq(typeof console[key], `in console.${ key }`)
		}
	})
})
