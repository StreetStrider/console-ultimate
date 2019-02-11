
export default function indent (_, seq = '   ')
{
	return _.replace(/\n/g, '\n' + seq)
}

export function leading (_, seq = '   ')
{
	_ = indent(_, seq)
	_ = seq + _
	return _
}
