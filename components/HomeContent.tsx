'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Modal from './Modal'

// ローディング中のコンポーネント
const LoadingScene = () => (
	<div className='w-full h-full flex items-center justify-center'>
		<div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
	</div>
)

const DynamicHeroScene = dynamic(() => import('../components/HeroScene'), {
	ssr: false,
	loading: LoadingScene,
})

export default function HomeContent() {
	const [showModal, setShowModal] = useState(false)

	useEffect(() => {
		// モーダルの表示を遅延させる代わりに、HeroSceneのロード完了後に表示
		const timer = setTimeout(() => {
			setShowModal(true)
		}, 3000)

		return () => clearTimeout(timer)
	}, [])

	return (
		<div className='flex-1 flex flex-col h-full min-h-[calc(100dvh-10rem)]'>
			<DynamicHeroScene />
			<Modal isOpen={showModal} onClose={() => setShowModal(false)} title='Shunki Tada' description='Backend Engineer & Developer' />
		</div>
	)
}
