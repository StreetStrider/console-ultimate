


module.exports = function (object, keys)
{
	keys.forEach(function (key)
	{
		if (object[key])
		{
			object[key] = object[key].bind(object);
		}
	})
}
