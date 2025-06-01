'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { type SiteType } from '../types/globals.type'
import LoadingLogo from './LoadingLogo'
import SiteCard from './SiteCard'
import TopTitle from './TopTitle'

interface HomeContentProps {
	siteData: SiteType[]
}

const DynamicHeroScene = dynamic(() => import('../components/HeroScene'), {
	ssr: false, // サーバー側でレンダリングせず、クライアントマウント後に読み込む
	loading: () => <div className='w-full h-screen bg-[#1a1a2e]' />, // 3D シーン読み込み中のプレースホルダー
})

export default function HomeContent({ siteData }: HomeContentProps) {
	const [isLoading, setIsLoading] = useState(true)
	return (
		<>
			<DynamicHeroScene />
			{isLoading && <LoadingLogo onLoadingComplete={() => setIsLoading(false)} />}
			{!isLoading && (
				<main className='w-full md:w-3/4 lg:w-2/4 mx-auto'>
					<TopTitle title='Home' />
					{siteData.map((site, i) => (
						<div key={i} className='my-4'>
							<SiteCard site={site} />
						</div>
					))}
				</main>
			)}
		</>
	)
}
