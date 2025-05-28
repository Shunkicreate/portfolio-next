'use client'

import { useState } from 'react'
import Image from 'next/image'
import Masonry from 'react-masonry-css'
import { Gallery as PhotoSwipeGallery, Item } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'

interface GalleryProps {
	images: {
		src: string
		alt: string
		width: number
		height: number
	}[]
}

const breakpointColumns = {
	default: 4,
	1280: 3,
	1024: 2,
	640: 1,
}

export default function Gallery({ images }: GalleryProps) {
	const [isLoading, setIsLoading] = useState(true)

	return (
		<div className='container mx-auto px-4 py-8'>
			<PhotoSwipeGallery>
				<Masonry breakpointCols={breakpointColumns} className='flex w-auto -ml-4' columnClassName='pl-4 bg-clip-padding'>
					{images.map((image, index) => (
						<div key={index} className='mb-4 relative group'>
							<Item original={image.src} thumbnail={image.src} width={image.width} height={image.height} alt={image.alt}>
								{({ ref, open }) => (
									<div ref={ref} onClick={open} className='cursor-pointer'>
										<div className='relative aspect-[4/3] overflow-hidden rounded-lg'>
											<Image
												src={image.src}
												alt={image.alt}
												fill
												sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw'
												className='object-cover transition-transform duration-300 group-hover:scale-105'
												priority={index < 4}
												onLoadingComplete={() => {
													if (index === images.length - 1) {
														setIsLoading(false)
													}
												}}
											/>
										</div>
									</div>
								)}
							</Item>
						</div>
					))}
				</Masonry>
			</PhotoSwipeGallery>
			{isLoading && (
				<div className='fixed inset-0 flex items-center justify-center bg-background/80 z-50'>
					<div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary'></div>
				</div>
			)}
		</div>
	)
}

