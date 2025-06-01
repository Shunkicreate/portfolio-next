'use client'

import Image from 'next/image'
import { useState } from 'react'
import { type SiteType } from '../types/globals.type'

interface SiteCardProps {
	site: SiteType
}

export default function SiteCard({ site }: SiteCardProps) {
	const [isImageLoading, setIsImageLoading] = useState(true)

	return (
		<article className='container mx-auto'>
			<div className='flex flex-col sm:flex-row border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300'>
				<div className='relative w-full sm:w-60 h-48 sm:h-32 flex-shrink-0'>
					<a
						href={site.url}
						target='_blank'
						rel='noopener noreferrer'
						className='block w-full h-full'
						aria-label={`Visit ${site.ogpTitle || ''}`}
					>
						{isImageLoading && <div className='absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse' />}
						<Image
							src={site.ogpImage || '/images/placeholder.jpg'}
							alt={`${site.name || ''} thumbnail`}
							fill
							sizes='(max-width: 640px) 100vw, 240px'
							className='object-cover'
							onLoadingComplete={() => setIsImageLoading(false)}
							priority={false}
						/>
					</a>
				</div>
				<div className='p-4 sm:p-8 flex-grow'>
					<h3 className='text-lg font-semibold line-clamp-1'>
						<a
							href={site.url}
							target='_blank'
							rel='noopener noreferrer'
							className='hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
						>
							{site.ogpTitle}
						</a>
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2'>{site.ogpDescription}</p>
					<div className='mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400'>
						<svg className='w-4 h-4 mr-1 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20' aria-hidden='true'>
							<path
								fillRule='evenodd'
								d='M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z'
								clipRule='evenodd'
							/>
						</svg>
						<span className='truncate'>{site.url || ''}</span>
					</div>
				</div>
			</div>
		</article>
	)
}
