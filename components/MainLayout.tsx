import { usePathname } from 'next/navigation'
import { type ReactNode } from 'react'
import { type SNSType } from '../types/globals.type'
import Footer from './Footer'
import Navigation from './Navigation'

interface MainLayoutProps {
	children: ReactNode
	SNSData: SNSType[]
}

export default function MainLayout({ children, SNSData }: MainLayoutProps) {
	const pathname = usePathname()
	const isHome = pathname === '/'

	return (
		<div className='h-full'>
			<Navigation />
			<div className='flex flex-col flex-1 min-h-[calc(100dvh-10rem)] pt-16'>{children}</div>
			{isHome ? null : <Footer SNSData={SNSData} />}
		</div>
	)
}
