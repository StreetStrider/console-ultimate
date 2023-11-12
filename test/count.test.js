
import it_console from './it-console.js'

describe('console.count', () =>
{
	it_console(
	{
		title: 'count',
		output: ' ⌚ 1\n ⌚ 2\n ⌚ 3\n',
		test (console)
		{
			console.count()
			console.count()
			console.count()
		},
	})

	it_console(
	{
		isTTY: true,
		title: 'count',
		output: ' ⌚ 1\n ⌚ 2\n ⌚ 3\n',
		test (console)
		{
			console.count()
			console.count()
			console.count()
		},
	})

	it_console(
	{
		title: 'label',
		output: ' ⌚ 1\n ⌚ X 1\n ⌚ Y 1\n ⌚ 2\n ⌚ X 2\n ⌚ 3\n',
		test (console)
		{
			console.count()
			console.count('X')
			console.count('Y')
			console.count()
			console.count('X')
			console.count()
		},
	})

	it_console(
	{
		title: 'reset',
		output: ' ⌚ 1\n ⌚ X 1\n ⌚ 2\n ⌚ X 2\n ⌚ 1\n ⌚ X 3\n ⌚ 2\n ⌚ X 1\n',
		test (console)
		{
			console.count()
			console.count('X')
			console.count()
			console.count('X')
			console.count.reset()
			console.count()
			console.count('X')
			console.count.reset('X')
			console.count()
			console.count('X')
		},
	})
})
