'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Modal from './Modal'

const DynamicHeroScene = dynamic(() => import('../components/HeroScene'), {
	ssr: false, // サーバー側でレンダリングせず、クライアントマウント後に読み込む
	loading: () => <div className='w-full h-full' />, // 3D シーン読み込み中のプレースホルダー
})

export default function HomeContent() {
	const [showModal, setShowModal] = useState(false)

	useEffect(() => {
		// 3秒後にモーダルを表示
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
