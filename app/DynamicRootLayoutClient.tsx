'use client'

import dynamic from 'next/dynamic'
import { ThemeProvider } from 'next-themes'
import { ReactNode, useState } from 'react'
import SNSDataJson from '../SNSdata.json'
import LoadingLayout from '../components/LoadingLayout'
import { type SNSType } from '../types/globals.type'

// 動的インポートでメインレイアウトを遅延ロード
const DynamicLayout = dynamic(() => import('../components/Layout'), {
	ssr: true,
	loading: () => null,
})

const SNSData: SNSType[] = SNSDataJson.data as unknown as SNSType[]

interface Props {
	children: ReactNode
}

export default function DynamicRootLayoutClient({ children }: Props) {
	const [isLoading, setIsLoading] = useState(true)

	return (
		<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
			<main>
				{isLoading ? (
					<LoadingLayout onLoadingComplete={() => setIsLoading(false)} />
				) : (
					<DynamicLayout SNSData={SNSData}>{children}</DynamicLayout>
				)}
			</main>
		</ThemeProvider>
	)
}
