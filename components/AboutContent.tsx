'use client'

import Image from 'next/image'

interface RankType {
	rank: number
	content: string
}

interface AboutContentProps {
	content: {
		title: string
		src: string
		rank: RankType[]
	}
}

export default function AboutContent({ content }: AboutContentProps) {
	return (
		<article className='border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden my-6'>
			<div className='flex flex-col md:flex-row'>
				{/* タイトルとアイコンセクション */}
				<div className='w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-300 dark:border-gray-600 p-6 md:p-8'>
					<div className='text-center mb-6 md:mb-8'>
						<h3 className='text-2xl md:text-3xl font-medium text-gray-900 dark:text-gray-100'>{content.title}</h3>
					</div>
					<div className='flex justify-center'>
						<div className='relative w-16 h-16'>
							<Image src={content.src} alt={`${content.title} icon`} fill className='object-contain' sizes='64px' />
						</div>
					</div>
				</div>

				{/* ランクリストセクション */}
				<div className='w-full md:w-2/3 p-6 md:p-8'>
					<ul className='space-y-4 md:space-y-6'>
						{content.rank.map((rank) => (
							<li key={rank.rank} className='flex items-start text-base md:text-lg text-gray-700 dark:text-gray-300'>
								<span className='flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full mr-3 mt-0.5'>
									{rank.rank}
								</span>
								<span className='leading-relaxed'>{rank.content}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</article>
	)
}

