'use client'

import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title: string
	description: string
}

export default function Modal({ isOpen, onClose, title, description }: ModalProps) {
	return (
		<Dialog open={isOpen} onClose={onClose} className='relative z-50'>
			<div className='fixed inset-0 bg-black/30' aria-hidden='true' />
			<div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
				<DialogPanel className='mx-auto max-w-xl rounded-xl bg-white p-12 shadow-2xl'>
					<DialogTitle className='text-3xl font-bold tracking-tight'>{title}</DialogTitle>
					<Description className='mt-6 text-lg leading-8 text-gray-600'>{description}</Description>
					<div className='mt-8 flex justify-end'>
						<button
							onClick={onClose}
							className='rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
						>
							Close
						</button>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	)
}

