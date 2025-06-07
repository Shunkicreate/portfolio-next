'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// Swiperのスタイルを動的インポート
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

interface HomeCarouselProps {
	imgs?: string[]
}

export default function HomeCarousel({ imgs }: HomeCarouselProps) {
	const [isLoading, setIsLoading] = useState(true)

	if (!imgs?.length) {
		return (
			<div className='w-full h-64 flex items-center justify-center rounded-lg'>
				<p className='text-gray-500 dark:text-gray-400'>No images available</p>
			</div>
		)
	}

	return (
		<div className='relative w-full aspect-video'>
			{isLoading && (
				<div className='absolute inset-0 flex items-center justify-center'>
					<div className='w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin' />
				</div>
			)}
			<Swiper
				spaceBetween={30}
				effect='fade'
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
					pauseOnMouseEnter: true,
				}}
				pagination={{
					clickable: true,
					dynamicBullets: true,
				}}
				navigation={true}
				modules={[Autoplay, EffectFade, Navigation, Pagination]}
				className='w-full h-full'
				onSwiper={() => setIsLoading(false)}
			>
				{imgs.map((src, i) => (
					<SwiperSlide key={src} className='relative'>
						<Image
							src={src}
							alt={`Carousel image ${i + 1}`}
							fill
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw'
							className='object-cover'
							priority={i === 0}
							onLoadingComplete={() => i === 0 && setIsLoading(false)}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
