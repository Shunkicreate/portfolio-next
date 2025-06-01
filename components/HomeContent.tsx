'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import LoadingLogo from './LoadingLogo'

const DynamicHeroScene = dynamic(() => import('../components/HeroScene'), {
	ssr: false, // サーバー側でレンダリングせず、クライアントマウント後に読み込む
	loading: () => <div className='w-full h-screen bg-[#1a1a2e]' />, // 3D シーン読み込み中のプレースホルダー
})

export default function HomeContent() {
	const [isLoading, setIsLoading] = useState(true)
	return (
		<>
			{isLoading && <LoadingLogo onLoadingComplete={() => setIsLoading(false)} />}
			<DynamicHeroScene />
		</>
	)
}
