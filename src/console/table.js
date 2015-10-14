


var
	extend = require('aux.js/object/extend'),
	forOwn = require('aux.js/object/each'),
	same   = require('aux.js/identity'),

	find   = require('lodash.find'),
	repeat = require('lodash.repeat'),

	isOn = require('../feature').isOn,

	format = require('../format'),

	styling = require('../styling/table');

module.exports = function (console)
{
	if (isOn(console, 'table'))
	{
		setup(console);
	}
}

function setup (console)
{
	console.table = function table (data, columns)
	{
		var
			styles = styling(console, console.options),
			view = new View(styles);

		if (Array.isArray(data))
		{
			data.forEach(moving(view, _labelIndex));
		}
		else
		{
			forOwn(data, moving(view, _labelKey));
		}

		view.output(console, columns);
	}
}

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


/* Labels */
var
	_labelIndex = '(index)',
	_labelKey   = '(key)',
	_labelValue = '(value)';


/* View */
function View (styles)
{
	this.styles = styles;

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

	forOwn(row, function (value, key)
	{
		view.column(key).updateWidth(value, view.styles);
	});

	this.rows.push(row);
}

var bold = require('cli-color').bold

View.prototype.output = function (console, visibleColumns)
{
	if (! this.rows.length)
	{
		return;
	}

	var
		view   = this,
		styles = view.styles,
		stream = console.writer.get(styles.stream);

	if (! stream)
	{
		return;
	}

	var sortedColumns = prepareColumns(view.columns, visibleColumns);

	if (! sortedColumns.length)
	{
		return;
	}

	var headerStyle = same;
	if (styles.color)
	{
		headerStyle = bold;
	}

	var header = sortedColumns
	.map(function (column)
	{
		return headerStyle(pad(column.label, column.width));
	});

	console.writer.write(styles.stream, outputRow(header));

	view.rows.forEach(function (row)
	{
		row = sortedColumns
		.map(function (column)
		{
			var value = row[column.label];

			value = inspect(value, column.width, styles);

			return value;
		});

		console.writer.write(styles.stream, outputRow(row));
	});
}

function prepareColumns (columns, visibleColumns)
{
	var
		specialCs = [],
		cs = [];

	addIfLabel(specialCs, columns, _labelIndex);
	addIfLabel(specialCs, columns, _labelKey);
	addIfLabel(specialCs, columns, _labelValue);

	cs = filterByColumns(columns, visibleColumns);

	return [].concat(specialCs, cs);
}

function addIfLabel (proj, columns, label)
{
	var item = find(columns, { label: label });
	if (item)
	{
		proj.push(item);
	}
}

function filterByColumns (columns, visibleColumns)
{
	switch (true)
	{
	case true:
		if (visibleColumns)
		{
			visibleColumns = [].concat(visibleColumns);
			if (visibleColumns.length)
			{
				visibleColumns = visibleColumns.map(String);

				return filterVisible(columns, visibleColumns);
			}
		}

	default:
		return filterNonSpecial(columns);
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

function filterVisible (columns, visibleColumns)
{
	columns = visibleColumns
	.map(function (name)
	{
		return find(columns, { label: name });
	})
	.filter(Boolean);

	return columns;
}

function outputRow (row)
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


var length = require('cli-color/get-stripped-length')

Column.prototype.updateWidth = function (value, styles)
{
	if (value !== undefined)
	{
		value = inspect(value, this.width, styles)
		this.width = Math.max(length(value), this.width)
	}
}

function inspect (value, width, styles)
{
	if (value !== undefined)
	{
		value = format.inspect(value, { depth: -1, colors: styles.color });
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
	var delta = length(string) - width

	if (delta < 0)
	{
		return repeat(' ', - delta) + string
	}
	else
	{
		return string
	}
}

function trim ()
{
	/* @todo calculate size overflow */
	/* inspect -> pad -> trim */
}
