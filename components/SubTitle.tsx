type Props = {
	title: string
	desctiption?: string
}
const TopTitle = (props: Props) => {
	return (
		<div>
			<h1 className='py-16 text-center text-6xl font-medium'>{props.title}</h1>
			<p>{props.desctiption}</p>
		</div>
	)
}

export default TopTitle
