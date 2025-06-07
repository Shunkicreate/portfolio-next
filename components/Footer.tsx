import { type SNSType } from '../types/globals.type'
import SNSIcon from './SNSIcon'

interface Props {
	SNSData: SNSType[]
}

export default function Footer({ SNSData }: Props) {
	return (
		<footer className='mt-auto py-4 px-4 h-40'>
			<div className='container mx-auto'>
				<div className='border-t border-border'>
					<div className='grid grid-cols-3 md:grid-cols-6 gap-4 py-6'>
						{SNSData.map((item, index) => (
							<SNSIcon key={index} sns={item} />
						))}
					</div>
				</div>
				<div className='text-center text-sm text-muted-foreground'>
					&copy; {new Date().getFullYear()} Shunki Tada. All rights reserved.
				</div>
			</div>
		</footer>
	)
}
