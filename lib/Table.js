/* eslint-disable */

var { min } = Math
var { max } = Math

import T from 'cli-table'

import { formatWithOptions as format } from './util'
import is_colors from './is-colors'

var Value = Symbol('Value')
// 


export default function Table ({ inspect_with, log, writer })
{
	var options = { ...inspect_with }
	options.colors = is_colors(options.colors, writer.stream)

	var is_key = true

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


			//else
			{
				if (! is_tabular(row))
				{
					if (! (Value in c$))
					{
						c$[Value] = max(3, label(Value).length + 2)
						cl.push(Value)
					}
				}
				else for (let key in row)
				{
					if (! (key in c$))
					{
						c$[key] = max(3, key.length + 2)
						cl.push(key)
					}
				}

				var __ = []

				if (! is_tabular(row))
				{
					let value = row

					value = format(options, value)

					var __ = indent([ value ], cl.length).reverse()
				}
				else cl.forEach(key =>
				{
					let value = ((key in row) && row[key] || null)

					if (value != null)
					{
						value = format(options, value)
					}
					else
					{
						value = ''
					}

					c$[key] = max(c$[key], value.length + 2)
					__.push(value)
				})

				_.push(__)
			}
		}

		log(cl)
		log(c$)
		log(_)

		_ = _.map(row => indent(row, cl.length))

		var head = cl.map(label)
		var colWidths = cl.map((key) =>
		{
			var v = c$[key]

			// v = max(3,  v)
			v = min(40, v)

			return v
		})

		var t = new T(
		{
			head,
			colWidths,
		})

		t.push(..._)

		writer(String(t))
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

function indent (row, length)
{
	if (row.length >= length)
	{
		return row.slice(0, length)
	}
	if (row.length < length)
	{
		return [ ...row, ...Array(length - row.length).fill('') ]
	}
}

function label (symbol)
{
	if (typeof symbol === 'symbol')
	{
		return symbol.toString().slice(7,-1)
	}
	else
	{
		return String(symbol)
	}
}
