import Image from 'next/image'

interface SNSIconProps {
	src: string

	link: string

	SNS: string
}

export default function SNSIcon({ src, link, SNS }: SNSIconProps) {
	return (
		<div className='flex justify-center'>
			<a
				href={link}
				target='_blank'
				rel='noopener noreferrer'
				className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
				aria-label={`Visit ${SNS} profile`}
			>
				<Image src={src} alt={`${SNS} icon`} width={32} height={32} className='w-8 h-8 md:w-10 md:h-10' />
			</a>
		</div>
	)
}
