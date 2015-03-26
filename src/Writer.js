


var
	keys = Object.keys,

	inst = require('aux.js/inst'),
	prop = require('aux.js/prop'),

	nl = require('./format').nl;

var Writer = module.exports = function Writer ()
{
	var writer = inst(Writer);

	writer.__streams = {};

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

Writer.prototype.write = function (name, chunk /* encoding */)
{
	/* @permissive */
	if (name in this.__streams)
	{
		this.__streams[name].write(chunk);
	}
}

/* this method will make sense in ProxyConsole implementation */
Writer.prototype.writeln = function (name, chunk)
{
	this.write(name, nl(chunk));
}

prop.get(Writer.prototype, 'names', function ()
{
	return keys(this.__streams);
});
