


var
	extend = require('aux.js/object/extend'),
	each = require('aux.js/object/each'),

	find = require('lodash.find'),
	pad  = require('lodash.padright'),

	isOn = require('../feature').isOn,

	nl = require('../format').nl;

/* @todo table styling (tty minimum) */
/* @todo table stream choosing */
/* @todo values styling as in dir (inspect) */

module.exports = function (console)
{
	if (isOn(console, 'table'))
	{
		setup(console);
	}
}

function setup (console)
{
	console.table = function table (data)
	{
		var view = new View;

		if (Array.isArray(data))
		{
			data.forEach(moving(view, _labelIndex));
		}
		else
		{
			each(data, moving(view, _labelKey));
		}

		view.output(console);
	}
}

var
	_labelIndex = '(index)',
	_labelKey   = '(key)',
	_labelValue = '(value)';

function moving (view, labelIndex)
{
	return function (item, index)
	{
		var row = {};
		row[labelIndex] = index;

		if (Object(item) === item)
		{
			extend(row, item);
		}
		else
		{
			row[_labelValue] = item;
		}

		view.row(row);
	}
}

/* View */
function View ()
{
	this.columns = [];
	this.rows    = [];
}

View.prototype.column = function (label)
{
	var column = find(this.columns, { label: label });

	if (! column)
	{
		column = new Column(label);
		this.columns.push(column);
	}

	return column;
}

View.prototype.row = function (row)
{
	var view = this;

	each(row, function (value, key)
	{
		value = String(value);

		view.column(key).updateWidth(value.length);
	});

	this.rows.push(row);
}

var
	colr = require('cli-color'),
	bold = colr.bold,
	green = colr.green;

View.prototype.output = function (console)
{
	if (! this.rows.length)
	{
		return;
	}

	var stream = console.writer.get('stdout');

	if (! stream)
	{
		return;
	}

	var view = this;

	var header = view.columns
	.map(function (column)
	{
		return bold(column.label);
	});

	stream.write(output_row(header));

	view.rows.forEach(function (row)
	{
		row = view.columns
		.map(function (column)
		{
			var value = row[column.label];

			(value !== undefined) || (value = '');

			value = String(value);
			value = pad(value, column.width);
			value = green(value);

			return value;
		});

		stream.write(output_row(row));
	});

	/* @todo calculate size overflow */
	/* @todo pad rows */
}

function output_row (row)
{
	row = row.join(' ');
	row = ' ' + row + ' \n';
	return row;
}

var Column = View.Column = function Column (label)
{
	label = String(label);

	this.label = label;
	this.width = label.length;
}

Column.prototype.updateWidth = function (width)
{
	this.width = Math.max(this.width, width);
}
