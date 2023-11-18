
import it_console from './it-console.js'

describe('thru, as', () =>
{
	it_console(
	{
		title: 'log.thru',
		output: ' ⚫ 1\n',
		test (console)
		{
			[ 1 ].map(console.log.thru)
		},
	})

	it_console(
	{
		title: 'dir.thru',
		output: ' ⚫ 1\n',
		test (console)
		{
			[ 1 ].map(console.dir.thru)
		},
	})
})
