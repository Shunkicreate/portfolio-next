'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import SNSDataJson from '../SNSdata.json'
import LoadingLayout from '../components/LoadingLayout'
import { type SNSType } from '../types/globals.type'

// 動的インポートでメインレイアウトとThemeProviderを遅延ロード
const DynamicLayout = dynamic(() => import('../components/Layout'), {
	ssr: true,
	loading: () => null,
})

const DynamicThemeProvider = dynamic(() => import('../components/theme-provider').then((mod) => mod.ThemeProvider), {
	ssr: true,
	loading: () => null,
})

const SNSData: SNSType[] = SNSDataJson.data

export default function DynamicRootLayoutClient({ children }: { children: React.ReactNode }) {
	const [isLoading, setIsLoading] = useState(true)
	return (
		<DynamicThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
			<main>
				{isLoading ? (
					<LoadingLayout onLoadingComplete={() => setIsLoading(false)} />
				) : (
					<DynamicLayout SNSData={SNSData}>{children}</DynamicLayout>
				)}
			</main>
		</DynamicThemeProvider>
	)
}

