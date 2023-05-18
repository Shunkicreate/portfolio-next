type rankType = {
	rank: number
	content: string
}
type Props = {
	content: {
		title: string
		src: string
		rank: rankType[]
	}
}

const AboutContent = (props: Props) => {
	const ranks = props.content.rank
	return (
		<div className='border-2 border-[#6c757d] m-4 rounded flex text-center'>
			<div className='w-1/3 border-r border-[#6c757d]'>
				<div className='my-16 text-3xl font-medium'>
					<h3>{props.content.title}</h3>
				</div>
				<div className='my-16'>
					<img src={props.content.src} alt={props.content.title + 'image'} className='w-16 h-16 m-auto' />
				</div>
			</div>
			<div className='w-2/3 flex items-center content-center'>
				<ul className='m-auto w-3/5 text-left list-disc'>
					{ranks.map((rank, i) => {
						return (
							<li key={i} className='text-xl leading-loose'>
								{rank.content}
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default AboutContent
