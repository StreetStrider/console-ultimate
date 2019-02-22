
import it_console from './it-console'

describe('table', () =>
{
	it_console(
	{
		title: 'primitive',
		output: ' ⚫ 17\n',
		test (console)
		{
			console.table(17)
		},
	})

	it_console(
	{
		title: 'ordinary',
		output: '\u001b[90m┌───┬───┬───┬───────────┬────────┬────┐\u001b[39m\n\u001b[90m│\u001b[39m\u001b[0m x \u001b[0m\u001b[90m│\u001b[39m\u001b[0m y \u001b[0m\u001b[90m│\u001b[39m\u001b[0m z \u001b[0m\u001b[90m│\u001b[39m\u001b[0m ⟨Value⟩   \u001b[0m\u001b[90m│\u001b[39m\u001b[0m 0      \u001b[0m\u001b[90m│\u001b[39m\u001b[0m a  \u001b[0m\u001b[90m│\u001b[39m\n\u001b[90m├───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m 1 \u001b[90m│\u001b[39m 2 \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m 2 \u001b[90m│\u001b[39m 3 \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m 17        \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m 1 \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m 3 \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m 17     \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m [ 17 ] \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m 1 \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m [] \u001b[90m│\u001b[39m\n\u001b[90m├───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m Symbol(S) \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m└───┴───┴───┴───────────┴────────┴────┘\u001b[39m\n',
		test (console)
		{
			console.table(
			[
				{ x: 1, y: 2 },
				{ y: 2, z: 3 },
				17,
				{ x: 1, z: 3 },
				[ 17 ],
				[[ 17 ]],
				{ x: 1, a: [] },
				Symbol('S'),
			])
		},
	})

	it_console(
	{
		title: 'object',
		output: '\u001b[90m┌───────┬───┬───┬───┬───────────┬────────┬────┐\u001b[39m\n\u001b[90m│\u001b[39m\u001b[0m ⟨Key⟩ \u001b[0m\u001b[90m│\u001b[39m\u001b[0m x \u001b[0m\u001b[90m│\u001b[39m\u001b[0m y \u001b[0m\u001b[90m│\u001b[39m\u001b[0m z \u001b[0m\u001b[90m│\u001b[39m\u001b[0m ⟨Value⟩   \u001b[0m\u001b[90m│\u001b[39m\u001b[0m 0      \u001b[0m\u001b[90m│\u001b[39m\u001b[0m a  \u001b[0m\u001b[90m│\u001b[39m\n\u001b[90m├───────┼───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m 1     \u001b[90m│\u001b[39m 1 \u001b[90m│\u001b[39m 2 \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───────┼───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m 2     \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m 2 \u001b[90m│\u001b[39m 3 \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───────┼───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m 3     \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m 17        \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───────┼───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m 4     \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m 17     \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───────┼───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m 10    \u001b[90m│\u001b[39m 1 \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m 3 \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───────┼───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m 20    \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m [ 17 ] \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───────┼───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m 21    \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m Symbol(S) \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───────┼───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m 25    \u001b[90m│\u001b[39m 1 \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m [] \u001b[90m│\u001b[39m\n\u001b[90m└───────┴───┴───┴───┴───────────┴────────┴────┘\u001b[39m\n',
		test (console)
		{
			console.table(
			{
				1: { x: 1, y: 2 },
				2: { y: 2, z: 3 },
				3: 17,
				10: { x: 1, z: 3 },
				4: [ 17 ],
				20: [[ 17 ]],
				25: { x: 1, a: [] },
				21: Symbol('S'),
			})
		},
	})

	//
	it_console(
	{
		isTTY: true,
		title: 'primitive (color)',
		output: ' ⚫ \u001b[33m17\u001b[39m\n',
		test (console)
		{
			console.table(17)
		},
	})

	it_console(
	{
		isTTY: true,
		title: 'ordinary (color)',
		output: '\u001b[90m┌───┬───┬───┬───────────┬────────┬────┐\u001b[39m\n\u001b[90m│\u001b[39m\u001b[31m x \u001b[39m\u001b[90m│\u001b[39m\u001b[31m y \u001b[39m\u001b[90m│\u001b[39m\u001b[31m z \u001b[39m\u001b[90m│\u001b[39m\u001b[31m ⟨Value⟩   \u001b[39m\u001b[90m│\u001b[39m\u001b[31m 0      \u001b[39m\u001b[90m│\u001b[39m\u001b[31m a  \u001b[39m\u001b[90m│\u001b[39m\n\u001b[90m├───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m \u001b[33m1\u001b[39m \u001b[90m│\u001b[39m \u001b[33m2\u001b[39m \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m \u001b[33m2\u001b[39m \u001b[90m│\u001b[39m \u001b[33m3\u001b[39m \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m \u001b[33m17\u001b[39m        \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m \u001b[33m1\u001b[39m \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m \u001b[33m3\u001b[39m \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m \u001b[33m17\u001b[39m     \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m [ \u001b[33m17\u001b[39m ] \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m \u001b[33m1\u001b[39m \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m [] \u001b[90m│\u001b[39m\n\u001b[90m├───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m \u001b[32mSymbol(S)\u001b[39m \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m└───┴───┴───┴───────────┴────────┴────┘\u001b[39m\n',
		test (console)
		{
			console.table(
			[
				{ x: 1, y: 2 },
				{ y: 2, z: 3 },
				17,
				{ x: 1, z: 3 },
				[ 17 ],
				[[ 17 ]],
				{ x: 1, a: [] },
				Symbol('S'),
			])
		},
	})

	it_console(
	{
		isTTY: true,
		title: 'object (color)',
		output: '\u001b[90m┌───────┬───┬───┬───┬───────────┬────────┬────┐\u001b[39m\n\u001b[90m│\u001b[39m\u001b[31m ⟨Key⟩ \u001b[39m\u001b[90m│\u001b[39m\u001b[31m x \u001b[39m\u001b[90m│\u001b[39m\u001b[31m y \u001b[39m\u001b[90m│\u001b[39m\u001b[31m z \u001b[39m\u001b[90m│\u001b[39m\u001b[31m ⟨Value⟩   \u001b[39m\u001b[90m│\u001b[39m\u001b[31m 0      \u001b[39m\u001b[90m│\u001b[39m\u001b[31m a  \u001b[39m\u001b[90m│\u001b[39m\n\u001b[90m├───────┼───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m 1     \u001b[90m│\u001b[39m \u001b[33m1\u001b[39m \u001b[90m│\u001b[39m \u001b[33m2\u001b[39m \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───────┼───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m 2     \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m \u001b[33m2\u001b[39m \u001b[90m│\u001b[39m \u001b[33m3\u001b[39m \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───────┼───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m 3     \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m \u001b[33m17\u001b[39m        \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───────┼───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m 4     \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m \u001b[33m17\u001b[39m     \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───────┼───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m 10    \u001b[90m│\u001b[39m \u001b[33m1\u001b[39m \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m \u001b[33m3\u001b[39m \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───────┼───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m 20    \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m [ \u001b[33m17\u001b[39m ] \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───────┼───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m 21    \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m \u001b[32mSymbol(S)\u001b[39m \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m    \u001b[90m│\u001b[39m\n\u001b[90m├───────┼───┼───┼───┼───────────┼────────┼────┤\u001b[39m\n\u001b[90m│\u001b[39m 25    \u001b[90m│\u001b[39m \u001b[33m1\u001b[39m \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m   \u001b[90m│\u001b[39m           \u001b[90m│\u001b[39m        \u001b[90m│\u001b[39m [] \u001b[90m│\u001b[39m\n\u001b[90m└───────┴───┴───┴───┴───────────┴────────┴────┘\u001b[39m\n',
		test (console)
		{
			console.table(
			{
				1: { x: 1, y: 2 },
				2: { y: 2, z: 3 },
				3: 17,
				10: { x: 1, z: 3 },
				4: [ 17 ],
				20: [[ 17 ]],
				25: { x: 1, a: [] },
				21: Symbol('S'),
			})
		},
	})
})
