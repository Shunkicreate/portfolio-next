'use client'

import { useState } from 'react'
import { type SiteType } from '../types/globals.type'
import Carousel from './HomeCarousel'
import LoadingLogo from './LoadingLogo'
import SiteCard from './SiteCard'
import TopTitle from './TopTitle'

interface HomeContentProps {
	imgs: string[]
	siteData: SiteType[]
}

export default function HomeContent({ imgs, siteData }: HomeContentProps) {
	const [isLoading, setIsLoading] = useState(true)
	return (
		<>
			{isLoading && <LoadingLogo onLoadingComplete={() => setIsLoading(false)} />}
			{!isLoading && (
				<main className='w-full md:w-3/4 lg:w-2/4 mx-auto'>
					<TopTitle title='Home' />
					<div className='mx-auto'>
						<Carousel imgs={imgs} />
					</div>

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
