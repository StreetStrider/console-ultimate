


var
	extend = require('aux.js/object/extend'),
	each = require('aux.js/object/each'),

	find   = require('lodash.find'),
	repeat = require('lodash.repeat'),

	isOn = require('../feature').isOn,

	format = require('../format');

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
		view.column(key).updateWidth(value);
	});

	this.rows.push(row);
}

var
	colr = require('cli-color'),
	strip = require('cli-color/strip'),
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
	var sortedColumns = sortColumns(view.columns);

	var header = sortedColumns
	.map(function (column)
	{
		return bold(pad(column.label, column.width));
	});

	stream.write(output_row(header));

	view.rows.forEach(function (row)
	{
		row = sortedColumns
		.map(function (column)
		{
			var value = row[column.label];

			value = inspect(value, column.width);

			return value;
		});

		stream.write(output_row(row));
	});

	/* @todo calculate size overflow */
	/* @todo pad rows */
}

function sortColumns (columns)
{
	var r = [];

	addIfLabel(r, columns, _labelIndex);
	addIfLabel(r, columns, _labelKey);
	addIfLabel(r, columns, _labelValue);

	r = r.concat(filterNonSpecial(columns));

	return r;
}

function addIfLabel (proj, columns, label)
{
	var item = find(columns, { label: label });
	if (item)
	{
		proj.push(item);
	}
}

function filterNonSpecial (columns)
{
	return columns.filter(function (column)
	{
		if (column.label === _labelIndex) return false;
		if (column.label === _labelKey) return false;
		if (column.label === _labelValue) return false;
		return true;
	});
}

function output_row (row)
{
	row = row.join(' ');
	row = format.spaced(row);
	row = format.nl(row);
	return row;
}


var Column = View.Column = function Column (label)
{
	label = String(label);

	this.label = label;
	this.width = label.length;
}

Column.prototype.updateWidth = function (value)
{
	if (value !== undefined)
	{
		var ansi = strip(inspect(value, this.width));
		this.width = Math.max(this.width, ansi.length);
	}
}

function inspect (value, width)
{
	if (value !== undefined)
	{
		value = format.inspect(value, { depth: -1, colors: true });
		value = pad(value, width);
	}
	else
	{
		value = repeat(' ', width);
	}

	return value;
}

function pad (string, width)
{
	var ansi = strip(string);

	var delta = ansi.length - width;

	if (delta < 0)
	{
		return repeat(' ', - delta) + string;
	}
	else
	{
		return string;
	}
}

function trim ()
{
	/* inspect -> pad -> trim */
}
