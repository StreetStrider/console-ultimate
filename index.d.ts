
import type { Kleur } from 'kleur'

import type { ConsoleUltimate } from './Console.js'
export type { ConsoleUltimate }


declare global
{
	interface Console
	{
		color: Kleur,
	}
}
