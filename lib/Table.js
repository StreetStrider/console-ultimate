
var { min } = Math
// var { max } = Math

// import T from 'cli-table'

import { formatWithOptions as format } from './util'
import is_colors from './is-colors'

export default function Table ({ inspect_with, log, writer })
{
	var options = { ...inspect_with }
	options.colors = is_colors(options.colors, writer.stream)

	function table (data, props)
	{
		if (! is_tabular(data))
		{
			return log(data)
		}

		if (! is_props(props)) { props = false }

		var cl = []
		var c$ = {}

		var _ = []

		for (let key in data)
		{
			let row = data[key]

			if (! is_tabular(row))
			{
				_.push(format(options, row))
			}
			else
			{
				let __ = []

				for (let key in row)
				{
					if (! (key in c$))
					{
						c$[key] = 20
						cl.push(key)
					}

					let
					value = row[key]
					value = format(options, value)

					c$[key] = min(20, value.length)

					__.push(value)
				}

				_.push(__)
			}
		}

		log(cl)
		log(c$)
		log(_)
	}

	return table
}

function is_tabular (data)
{
	if (Array.isArray(data))   { return true }
	if (data === Object(data)) { return true }
	return false
}

function is_props (props)
{
	return Array.isArray(props)
}
