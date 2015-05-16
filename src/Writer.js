


var
	keys = Object.keys,

	inst = require('aux.js/inst'),
	prop = require('aux.js/prop'),

	nl = require('./format').nl;

var Writer = module.exports = function Writer ()
{
	var writer = inst(Writer);

	writer.__streams = {};
	transforms(writer);

	return writer;
}

Writer.prototype.add = function (name, stream)
{
	if (name in this.__streams)
	{
		throw new Error('stream_already_added');
	}

	return this.__streams[name] = stream;
}

/* @redundant, this method will make sense in ProxyConsole implementation */
Writer.prototype.writeln = function (name, chunk)
{
	this.write(name, nl(chunk));
}

Writer.prototype.write = function (name, chunk /* encoding */)
{
	/* @permissive */
	var stream = this.get(name);
	if (stream)
	{
		chunk = pretransform(chunk, this.__transforms);

		stream.write(chunk);
	}
}

Writer.prototype.get = function (name)
{
	if (name in this.__streams)
	{
		return this.__streams[name];
	}
}

prop.get(Writer.prototype, 'names', function ()
{
	return keys(this.__streams);
});

function transforms (writer)
{
	writer.__transforms = [];
	prop.value(writer, 'transform', transform, 'write', 'config');
	transform.pop = pop;

	function transform (fn)
	{
		writer.__transforms.push(fn);
	}

	function pop ()
	{
		if (writer.__transforms.length)
		{
			writer.__transforms.pop();
		}
		else
		{
			throw new Error('no_transforms_to_pop');
		}
	}
}

function pretransform (input, transforms)
{
	if (! transforms.length)
	{
		return input;
	}

	for (var i = transforms.length; i; --i)
	{
		var fn = transforms[i - 1];

		input = fn(input);
	}

	return input;
}
