
import it_console from './it-console'

describe('console.time', () =>
{
	it_console(
	{
		title: 'time',
		output: detime(' ⌚ T U\n'),
		test (console)
		{
			console.time()
			console.timeEnd()
		},
	})

	it_console(
	{
		title: 'time labels',
		output: detime(' ⌚ A T U\n ⌚ B T U\n'),
		test (console)
		{
			console.time('A')
			console.time('B')
			console.timeEnd('A')
			console.timeEnd('B')
		},
	})

	it_console(
	{
		title: 'time intermediate',
		output: detime(' ⌚ A T U\n ⌚ B T U\n'),
		test (console)
		{
			console.time('A')
			console.time('B')
			console.timeLog('A')
			console.timeLog('B')
		},
	})
})

function detime (pattern)
{
	return (output) =>
	{
		output = output.replace(/\d+(.\d+)? (h|min|s|ms|μs|ns)/g, 'T U')
		expect(output).eq(pattern)
	}
}
