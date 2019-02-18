
import T from 'cli-table'

export default function Table ({ writer })
{
	function table (data)
	{
		writer(String(data))
	}

	return table
}
