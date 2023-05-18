type Props = {
	src: string

	link: string

	SNS: string
}

const SNSIcon = (props: Props) => {
	return (
		<div className='w-8 m-auto lg:w-12'>
			<a href={props.link} target='_blank' rel='noopener noreferrer'>
				<img src={props.src} alt={props.SNS} />
			</a>
		</div>
	)
}

export default SNSIcon
