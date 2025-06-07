'use client'
import Image from 'next/image'
import Link from 'next/link'

interface ProjectCardProps {
	title: string
	url: string
	image?: string
}

export default function ProjectCard({ title, url, image }: ProjectCardProps) {
	return (
		<Link
			href={url}
			target='_blank'
			rel='noopener noreferrer'
			className='bg-card rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col'
		>
			{image && (
				<div className='relative w-full aspect-video'>
					<Image src={image} alt={title} fill className='object-cover' />
				</div>
			)}
			<div className='p-4 flex flex-col flex-1'>
				<h3 className='text-lg font-bold mb-1'>{title}</h3>
			</div>
		</Link>
	)
}
