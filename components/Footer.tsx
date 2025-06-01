import { type SNSType } from '../types/globals.type'
import SNSIcon from './SNSIcon'

interface FooterProps {
	SNSData: SNSType[]
}

export default function Footer({ SNSData }: FooterProps) {
	const currentYear = new Date().getFullYear()

	return (
		<footer className='mt-auto py-8 px-4 bg-gray-50 dark:bg-gray-900'>
			<div className='container mx-auto'>
				<div className='border-t border-gray-200 dark:border-gray-700'>
					<div className='grid grid-cols-3 md:grid-cols-6 gap-4 py-8'>
						{SNSData.map((item) => (
							<SNSIcon key={item.SNS} src={item.src} link={item.link} SNS={item.SNS} />
						))}
					</div>
				</div>
				<div className='text-center text-sm text-gray-600 dark:text-gray-400'>
					&copy; {currentYear} Shunki Tada. All rights reserved.
				</div>
			</div>
		</footer>
	)
}
