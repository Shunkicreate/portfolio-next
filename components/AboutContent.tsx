export default function AboutContent() {
	return (
		<div className='flex items-center justify-center px-4'>
			<section
				className='
					max-w-xl
					w-full
					p-10
					rounded-2xl
					shadow-lg
					border border-border
					transform transition-transform duration-300
					transition-shadow duration-300 
					hover:animate-hoverShake hover:shadow-2xl
				'
			>
				<h2 className='text-3xl font-bold text-foreground mb-6 text-center'>
					多田 駿希&nbsp;
					<span className='text-base text-muted-foreground'>(Shunki Tada)</span>
				</h2>
				<ul className='space-y-4 text-lg text-foreground'>
					<li>
						<span className='font-semibold'>学歴:</span>
						<span className='ml-2'>松山東高校 → 立命館大学 情報理工学部 卒</span>
					</li>
					<li>
						<span className='font-semibold'>職歴:</span>
						<span className='ml-2'>株式会社 DeNA — Voice Pococha</span>
					</li>
					<li>
						<span className='font-semibold'>ブログ:</span>
						<a
							href='https://note.com/shunki_create'
							target='_blank'
							rel='noopener noreferrer'
							className='ml-2 text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200'
						>
							Note
						</a>
						<span className='mx-2'>/</span>
						<a
							href='https://qiita.com/Shunkicreate'
							target='_blank'
							rel='noopener noreferrer'
							className='text-green-600 dark:text-green-400 underline hover:text-green-800 dark:hover:text-green-200'
						>
							Qiita
						</a>
					</li>
				</ul>
			</section>
		</div>
	)
}
