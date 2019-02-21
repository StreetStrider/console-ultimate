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
			track(Key, label(Key))
		}

		for (let key in data)
		{
			if (is_key)
			{
				track(Key, key)
			}

			let row = data[key]

			if (! is_tabular(row))
			{
				track(Value, label(Value))
			}
			else for (let key in row)
			{
				track(key, key)
			}

			var __ = []

			if (is_key)
			{
				let value = format(options, key)

				track(Key, value)

				__.push(value)
			}

			if (! is_tabular(row))
			{
				let value = format(options, row)

				track(Value, value)

				__ = indent(__, h_seq.length)
				__[ h_seq.indexOf(Value) ] = value
			}
			else h_seq.forEach(key =>
			{
				if (key === Key) { return }

				if (key in row)
				{
					var value = format(options, row[key])
				}
				else
				{
					var value = ''
				}

				track(key, value)

				__.push(value)
			})

			_.push(__)
		}

		function track (key, value)
		{
			if (! (key in h_map))
			{
				h_map[key] = 3
				h_seq.push(key)
			}

			h_map[key] = max(h_map[key], colw(value))
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

function colw (text)
{
	return (text.length + 2)
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
