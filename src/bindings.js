


module.exports = function (object, keys)
{
	keys.forEach(function (key)
	{
		object[key] = object[key].bind(object);
	})
}
