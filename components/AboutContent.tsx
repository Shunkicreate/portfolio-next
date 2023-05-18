type rankType = {
	rank: number
	content: string
}
type Props = {
	title: string
	src: string
	rank: rankType[]
}

const AboutContent = (props: Props) => {
	const ranks = props.rank
	return (
		<>
			<div className='col-md-4'>
				<div className='row justify-content-center content-title'>
					<div className='col-12'>
						<h3>{props.title}</h3>
					</div>
				</div>
				<div className='row justify-content-center'>
					<div className='col-lg-4 col-md-8 col-6'>
						<img src={props.src} alt={props.title + 'image'} />
					</div>
				</div>
			</div>
			<div className='col-md-8 border-start border-secondary border-1 text-start'>
				<ul className='lists'>
					{ranks.map((rank, i) => {
						return <li key={i}>{rank.content}</li>
					})}
				</ul>
			</div>
		</>
	)
}

export default AboutContent
