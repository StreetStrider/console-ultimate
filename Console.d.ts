
import type { Kleur } from 'kleur'


export interface ConsoleUltimate extends Console
{
	color: Kleur,
}

export default function ConsoleUltimate (...args: any[]): ConsoleUltimate
