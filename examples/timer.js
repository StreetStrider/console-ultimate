

var
	c,
	hr,
	Console = require('..');

c = Console();
hr = Console(null, null,
{
	features:
	{
		timer:
		{
			hrtime: true
		}
	}
});

c.log('started…');

c.time();
c.time('with_label');
c.time('retrieve');

hr.time();

setTimeout(function ()
{

	c.timeEnd();
	c.timeEnd('with_label');
	// c.time.end('with_label'); // console-ultimate extension

	var t = c.time.retrieve('retrieve');
	/* get time in variable */
	c.log('from variable:', t);

	hr.timeEnd();

}, Math.random() * 3000);
