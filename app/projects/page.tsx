'use client'
import ProjectCard from '@/components/ProjectCard'
import sitedata from '@/sitedata.json'
import { useState } from 'react'

export default function ProjectsPage() {
	const [showAll, setShowAll] = useState(false)
	const projects = sitedata.data
	const top5 = projects.slice(0, 5)
	const rest = projects.slice(5)

	return (
		<div className='container mx-auto py-10'>
			<h1 className='text-3xl font-bold mb-8'>Projects</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
				{top5.map((project) => (
					<ProjectCard key={project.name} title={project.name} url={project.url} image={project.ogpImage} />
				))}
				{showAll &&
					rest.map((project) => (
						<ProjectCard key={project.name} title={project.name} url={project.url} image={project.ogpImage} />
					))}
			</div>
			{!showAll && rest.length > 0 && (
				<div className='flex justify-center mt-8'>
					<button
						className='px-6 py-2 rounded bg-muted text-foreground hover:bg-accent transition-colors'
						onClick={() => setShowAll(true)}
					>
						Read More
					</button>
				</div>
			)}
		</div>
	)
}
