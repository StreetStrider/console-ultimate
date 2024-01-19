
import it_console from './it-console.js'

describe('thru, as', () =>
{
	it_console(
	{
		title: 'log.thru',
		output: ' ⬤ 5 0 [ 5 ]\n',
		test (console)
		{
			expect([ 5 ].map(console.log.thru)).deep.eq([ 5 ])
		},
	})

	it_console(
	{
		title: 'dir.thru',
		output: ' ⬤ 5\n',
		test (console)
		{
			expect([ 5 ].map(console.dir.thru)).deep.eq([ 5 ])
		},
	})

	it_console(
	{
		title: 'log.as',
		output: ' ⬤ label 10 5 0 [ 5 ]\n',
		test (console)
		{
			expect([ 5 ].map(console.log.as('label', 10))).deep.eq([ 5 ])
		},
	})
})
