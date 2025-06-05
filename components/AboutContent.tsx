export default function AboutContent() {
	return (
		<div className='flex items-center justify-center px-4'>
			<section
				className='
          max-w-xl
          w-full
          p-10                  /* ← 余白を少し増やす */
          bg-white dark:bg-gray-900
          rounded-2xl
          shadow-lg
          border border-gray-200 dark:border-gray-700
          transform transition-transform duration-300
		  transition-shadow duration-300 
		  hover:animate-hoverShake hover:shadow-2xl
        '
			>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center'>
					多田 駿希&nbsp;
					<span className='text-base text-gray-500 dark:text-gray-400'>(Shunki Tada)</span>
				</h2>
				<ul className='space-y-4 text-lg text-gray-800 dark:text-gray-200'>
					<li>
						<span className='font-semibold'>学歴:</span>
						<span className='ml-2'>松山東高校 → 立命館大学 情報理工学部 卒</span>
					</li>
					<li>
						<span className='font-semibold'>職歴:</span>
						<span className='ml-2'>株式会社 DeNA — Voice Pococha 開発担当</span>
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
