import Image from 'next/image'
import Link from 'next/link'
import { type SNSType } from '../types/globals.type'

interface Props {
	sns: SNSType
}

export default function SNSIcon({ sns }: Props) {
	return (
		<Link href={sns.link} target='_blank' rel='noopener noreferrer' className='block' aria-label={sns.SNS}>
			<div className='p-2 rounded-full hover:bg-accent transition-colors'>
				<Image
					src={sns.src}
					alt={sns.SNS}
					width={40}
					height={40}
					className='w-8 h-8 md:w-10 md:h-10 object-contain text-foreground dark:invert'
				/>
			</div>
		</Link>
	)
}
