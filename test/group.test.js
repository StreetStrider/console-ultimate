
import it_console from './it-console'

describe('console.group', () =>
{
	it_console(
	{
		title: 'grouping',
		output: ' ■\n ┊  ⚫ 1\n ┊  ⚫ 2\n ┊  ⚫ 3\n ■\n',
		test (console)
		{
			console.group()
			console.log(1)
			console.warn(2)
			console.info(3)
			console.groupEnd()
		},
	})

	it_console(
	{
		isTTY: true,
		title: 'grouping colors',
		output: ' ■\n\u001b[0m\u001b[0m ┊ \u001b[0m\u001b[0m\u001b[0m ⚫ \u001b[33m1\u001b[39m\u001b[0m\n\u001b[0m\u001b[0m ┊ \u001b[0m\u001b[0m\u001b[33m ⚫ \u001b[33m2\u001b[33m\u001b[39m\n\u001b[0m\u001b[0m ┊ \u001b[0m\u001b[0m\u001b[34m ⚫ \u001b[33m3\u001b[34m\u001b[39m\n ■\n',
		test (console)
		{
			console.group()
			console.log(1)
			console.warn(2)
			console.info(3)
			console.groupEnd()
		},
	})

	it_console(
	{
		title: 'group name',
		output: ' ■ X:\n\u001b[0m\u001b[0m ┊ \u001b[0m\u001b[0m ⚫ 1\n ■ X.\n ■ Y:\n\u001b[0m\u001b[0m ┊ \u001b[0m\u001b[0m ⚫ 2\n ■ Y.\n ■\n\u001b[0m\u001b[0m ┊ \u001b[0m\u001b[0m ⚫ 3\n ■\n',
		test (console)
		{
			console.group('X')
			console.log(1)
			console.groupEnd()

			console.group('Y', 'Z')
			console.warn(2)
			console.groupEnd()

			console.group()
			console.info(3)
			console.groupEnd()
		},
	})

	it_console(
	{
		title: 'nesting',
		output: ' ⚫ 0\n ■ X1:\n\u001b[0m\u001b[0m ┊ \u001b[0m\u001b[0m ⚫ 1\n\u001b[0m\u001b[0m ┊ \u001b[0m\u001b[0m ■ X2:\n\u001b[0m\u001b[0m ┊ \u001b[0m\u001b[0m\u001b[0m\u001b[0m ┊ \u001b[0m\u001b[0m ⚫ 2\n\u001b[0m\u001b[0m ┊ \u001b[0m\u001b[0m\u001b[0m\u001b[0m ┊ \u001b[0m\u001b[0m ■ X3:\n\u001b[0m\u001b[0m ┊ \u001b[0m\u001b[0m\u001b[0m\u001b[0m ┊ \u001b[0m\u001b[0m\u001b[0m\u001b[0m ┊ \u001b[0m\u001b[0m ⚫ 3\n\u001b[0m\u001b[0m ┊ \u001b[0m\u001b[0m\u001b[0m\u001b[0m ┊ \u001b[0m\u001b[0m ■ X3.\n\u001b[0m\u001b[0m ┊ \u001b[0m\u001b[0m\u001b[0m\u001b[0m ┊ \u001b[0m\u001b[0m ⚫ 2\n\u001b[0m\u001b[0m ┊ \u001b[0m\u001b[0m ■ X2.\n\u001b[0m\u001b[0m ┊ \u001b[0m\u001b[0m ⚫ 1\n ■ X1.\n ⚫ 0\n',
		test (console)
		{
			console.log(0)
			console.group('X1')
			console.log(1)
			console.group('X2')
			console.warn(2)
			console.group('X3')
			console.info(3)
			console.groupEnd()
			console.warn(2)
			console.groupEnd()
			console.log(1)
			console.groupEnd()
			console.groupEnd() //< double
			console.log(0)
		},
	})

	it_console(
	{
		title: 'capturing around stream writes',
		output: ' ■\n\u001b[0m\u001b[0m ┊ \u001b[0m\u001b[0m ⚫ 1\n\u001b[0m\u001b[0m ┊ \u001b[0m\u001b[0m ⚫ 1\n ■\n',
		test (console, options)
		{
			console.group()
			console.log(1)
			options.stdout.write(' ⚫ 1\n')
			console.groupEnd()
		},
	})
})
