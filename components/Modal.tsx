import { Dialog } from '@headlessui/react'
import Link from 'next/link'
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
		setTimeout(() => {
			onClose()
			setIsClosing(false)
		}, 300)
	}

	useEffect(() => {
		if (!isOpen) setIsClosing(false)
	}, [isOpen])

	const overlayClass = 'fixed inset-0 bg-black/30 dark:bg-black/20 backdrop-blur-sm dark:backdrop-blur-none'
	const panelBaseClass =
		'mx-auto max-w-xl rounded-2xl bg-gradient-to-br from-white/90 to-white/40 dark:from-black/20 dark:to-black/5 backdrop-blur-sm dark:backdrop-blur-xs border border-white/40 dark:border-black/20 shadow-[inset_0_0_10px_rgba(255,255,255,0.2)] dark:shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] ring-1 ring-black/[0.17] dark:ring-white/[0.17] p-16 relative before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-br before:from-white/50 before:to-white/30 dark:before:from-black/10 dark:before:to-transparent before:-z-10 transition-all duration-300'
	const panelStateClass = isClosing ? 'scale-95 opacity-0 translate-x-full' : 'scale-100 opacity-100 translate-x-0'

	return (
		<Dialog open={isOpen} onClose={handleClose} className='relative z-50'>
			{/* Overlay */}
			<div className={overlayClass} aria-hidden='true' />

			{/* Modal Panel */}
			<div className='fixed inset-0 flex items-center justify-center p-4'>
				<Dialog.Panel className={`${panelBaseClass} ${panelStateClass}`}>
					{/* Close Button */}
					<button
						onClick={handleClose}
						aria-label='Close modal'
						className='absolute top-4 right-4 p-2 rounded-full text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/30 dark:focus:ring-white/30 transition'
					>
						×
					</button>

					<Dialog.Title className='text-3xl font-bold tracking-tight text-gray-900/80 dark:text-white/80'>{title}</Dialog.Title>

					<Dialog.Description className='mt-6 text-lg leading-8 text-gray-600/80 dark:text-gray-300/80'>
						{description}
					</Dialog.Description>

					<div className='mt-8 flex justify-end space-x-4'>
						{/* Visit Scene Button */}
						<button
							onClick={handleClose}
							className='rounded-md bg-black/10 dark:bg-white/10 backdrop-blur-sm px-6 py-2.5 text-sm font-semibold text-black/70 dark:text-white/70 shadow-sm ring-1 ring-black/[0.17] dark:ring-white/[0.17] hover:bg-black/20 dark:hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30 dark:focus-visible:outline-white/30 transition-all duration-200'
						>
							Visit Scene
						</button>

						{/* whoami Button */}
						<Link
							href='/about'
							onClick={handleClose}
							className='rounded-md bg-black/10 dark:bg-white/10 backdrop-blur-sm px-6 py-2.5 text-sm font-semibold text-black/70 dark:text-white/70 shadow-sm ring-1 ring-black/[0.17] dark:ring-white/[0.17] hover:bg-black/20 dark:hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30 dark:focus-visible:outline-white/30 transition-all duration-200'
						>
							$ whoami
						</Link>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}
