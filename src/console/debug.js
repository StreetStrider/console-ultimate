


exports.is = function (console)
{
	return !! console.options.debug;
}

exports.setup = function (console)
{
	console.debug = debug;
}

function debug ()
{
	return this.log.apply(this, arguments);
}
