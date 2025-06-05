'use client'

import dynamic from 'next/dynamic'

// HomeContentコンポーネントを動的インポート
const DynamicHomeContent = dynamic(() => import('../components/HomeContent'), {
	loading: () => (
		<div className='flex-1 flex items-center justify-center min-h-[calc(100dvh-10rem)]'>
			<div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
		</div>
	),
	ssr: false,
})

export default function Home() {
	return <DynamicHomeContent />
}
