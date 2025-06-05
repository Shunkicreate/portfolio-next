import AboutContent from '@/components/AboutContent'

export default function About() {
	return (
		<div className='flex flex-col flex-1 h-full bg-gray-100 dark:bg-gray-800'>
			<h1 className='text-3xl font-bold text-gray-900 dark:text-white p-4'>About</h1>

			<div className='flex-1 flex items-center justify-center px-4'>
				<AboutContent />
			</div>
		</div>
	)
}
