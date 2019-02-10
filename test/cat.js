
import concat from 'concat-stream'

export default function cat ()
{
	var rs
	var p = new Promise($rs => { rs = $rs })
	var s = concat({}, rs)

	return [ s, p ]
}
