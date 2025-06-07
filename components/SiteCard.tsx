'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { type SiteType } from '../types/globals.type'

interface SiteCardProps {
	site: SiteType
}

export default function SiteCard({ site }: SiteCardProps) {
	const [isImageLoading, setIsImageLoading] = useState(true)

	return (
		<div className='bg-card border border-border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow'>
			<Link href={site.url} target='_blank' rel='noopener noreferrer'>
				<div className='relative aspect-video'>
					{isImageLoading && <div className='absolute inset-0 animate-pulse' />}
					<Image
						src={site.ogpImage || '/images/placeholder.jpg'}
						alt={site.ogpTitle || ''}
						fill
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						className='object-cover'
						onLoad={() => setIsImageLoading(false)}
						priority={false}
					/>
				</div>
				<div className='p-4'>
					<h3 className='text-lg font-semibold text-foreground line-clamp-1'>{site.ogpTitle}</h3>
					<p className='text-sm text-muted-foreground mt-1 line-clamp-2'>{site.ogpDescription}</p>
					<div className='mt-2 flex items-center text-sm text-muted-foreground'>
						<time dateTime={site.date}>{site.date}</time>
					</div>
				</div>
			</Link>
		</div>
	)
}
