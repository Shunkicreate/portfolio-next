import { type ReactNode } from 'react'
import { type SNSType } from '../types/globals.type'
import Footer from './Footer'
// import Header from './Header' // ナビゲーションはapp/layout.tsxで呼び出すため削除

interface LayoutProps {
	children: ReactNode
	SNSData: SNSType[]
}

export default function Layout({ children, SNSData }: LayoutProps) {
	return (
		<div className='min-h-screen flex flex-col'>
			{/* <Header /> 削除 */}
			<div className='flex-grow'>{children}</div>
			<Footer SNSData={SNSData} />
		</div>
	)
}
