import { promises as fs } from 'fs'
import path from 'path'
import { Metadata } from 'next'
import Gallery from '@/components/Gallery'

export const metadata: Metadata = {
	title: 'Gallery | Shunki Create',
	description: 'A collection of photographs and visual works by Shunki Tada',
}

async function getGalleryImages() {
	const imgDirectory = path.join(process.cwd(), 'public/gallery')
	const files = await fs.readdir(imgDirectory)

	// Filter for image files and get their metadata
	const imageFiles = files.filter((file) => /\.(jpg|jpeg|png|avif|webp)$/i.test(file))

	return imageFiles.map((file) => ({
		src: `/gallery/${file}`,
		alt: file.replace(/\.[^/.]+$/, '').replace(/-/g, ' '),
		width: 1920, // As per spec, images are resized to 1920px width
		height: 1080, // This will be adjusted based on actual image aspect ratio
	}))
}

export default async function GalleryPage() {
	const images = await getGalleryImages()

	return (
		<main className='min-h-screen py-8'>
			<div className='container mx-auto px-4'>
				<h1 className='text-4xl font-serif mb-8'>Gallery</h1>
				<Gallery images={images} />
			</div>
		</main>
	)
}
