'use client'

import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react'
import Link from 'next/link'
import 'animate.css'
import { useEffect, useState } from 'react'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title: string
	description: string
}

export default function Modal({ isOpen, onClose, title, description }: ModalProps) {
	const [isClosing, setIsClosing] = useState(false)

	const handleClose = () => {
		setIsClosing(true)
		// アニメーション完了を待ってから実際にモーダルを閉じる
		setTimeout(() => {
			setIsClosing(false)
			onClose()
		}, 500) // アニメーションの時間に合わせる
	}

	// モーダルが開いたときにアニメーションクラスをリセット
	useEffect(() => {
		if (isOpen) {
			setIsClosing(false)
		}
	}, [isOpen])

	return (
		<Dialog open={isOpen} onClose={handleClose} className='relative z-50'>
			<div className='fixed inset-0 bg-black/[2%] backdrop-blur-[1px] dark:bg-black/[2%]' aria-hidden='true' />
			<div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
				<DialogPanel
					className={`mx-auto max-w-xl rounded-2xl 
					bg-gradient-to-br from-white/30 to-white/10 dark:from-black/30 dark:to-black/10
					backdrop-blur-[7.1px]
					border border-white/30 dark:border-black/30
					shadow-[inset_0_0_10px_rgba(255,255,255,0.15)] dark:shadow-[inset_0_0_10px_rgba(0,0,0,0.15)]
					ring-1 ring-black/[0.17] dark:ring-white/[0.17]
					p-16
					relative
					before:absolute before:inset-0 before:rounded-2xl before:p-[1px]
					before:bg-gradient-to-br before:from-white/10 before:to-white/5 dark:before:from-white/5 dark:before:to-transparent
					before:-z-10
					animate__animated ${isClosing ? 'animate__zoomOutRight animate__faster' : 'animate__fadeIn animate__slow'}
				`}
				>
					<DialogTitle className='text-3xl font-bold tracking-tight text-gray-900/80 dark:text-white/80'>{title}</DialogTitle>
					<Description className='mt-6 text-lg leading-8 text-gray-600/80 dark:text-gray-300/80'>{description}</Description>
					<div className='mt-8 flex justify-end'>
						<Link
							href='/about'
							onClick={handleClose}
							className='rounded-md 
								bg-black/10 dark:bg-white/10 
								backdrop-blur-sm 
								px-6 py-2.5 
								text-sm font-semibold 
								text-black/70 dark:text-white/70 
								shadow-sm 
								ring-1 ring-black/[0.17] dark:ring-white/[0.17]
								hover:bg-black/20 dark:hover:bg-white/20 
								focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
								focus-visible:outline-black/30 dark:focus-visible:outline-white/30 
								transition-all duration-200'
						>
							$ whoami
						</Link>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	)
}
