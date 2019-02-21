/* eslint-disable */

var { min } = Math
var { max } = Math

import T from 'cli-table'

import { formatWithOptions as format } from './util'
import is_colors from './is-colors'


var Key   = Symbol('⟨Key⟩')
var Value = Symbol('⟨Value⟩')


export default function Table ({ inspect_with, log, writer })
{
	var options = { ...inspect_with }
	options.colors = is_colors(options.colors, writer.stream)
	options.colors = false

	function table (data, props)
	{
		if (! is_tabular(data))
		{
			return log(data)
		}

		// if (! is_props(props)) { props = false }

		var is_key = (! Array.isArray(data))

		var h_seq = []
		var h_map = {}

		var _ = []

		if (is_key)
		{
			h_map[Key] = max(3, label(Key).length + 2)
			h_seq.push(Key)
		}

		for (let key in data)
		{
			let row = data[key]

			if (is_key)
			{
				h_map[Key] = max(h_map[Key], key.length + 2)
			}

			if (! is_tabular(row))
			{
				if (! (Value in h_map))
				{
					h_map[Value] = max(3, label(Value).length + 2)
					h_seq.push(Value)
				}
			}
			else for (let key in row)
			{
				if (! (key in h_map))
				{
					h_map[key] = max(3, key.length + 2)
					h_seq.push(key)
				}
			}

			var __ = []

			if (is_key)
			{
				let value = format(options, key)

				h_map[key] = max(h_map[key], value.length + 2)

				__.push(value)
			}

			if (! is_tabular(row))
			{
				let value = row

				value = format(options, value)

				__ = indent(__, 1)
				__ = [ ...__, ...indent([ value ], (h_seq.length - 1)).reverse() ]
			}
			else h_seq.forEach(key =>
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

				h_map[key] = max(h_map[key], value.length + 2)
				__.push(value)
			})

			_.push(__)
		}

		// log(h_seq)
		// log(h_map)
		// log(_)

		_ = _.map(row => indent(row, h_seq.length))

		var head = h_seq.map(label)
		var colWidths = h_seq.map((key) =>
		{
			var v = h_map[key]

			// v = max(3,  v)
			v = min(40, v)

			return v
		})

		var t = new T(
		{
			style: { head: [ 'reset' ] },
			// colors: false, // https://github.com/Automattic/cli-table/issues/109
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
