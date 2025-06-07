import type { Meta, StoryObj } from '@storybook/react'
import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'
import SNSDataJson from '../SNSdata.json'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import { type SNSType } from '../types/globals.type'

const SNSData: SNSType[] = SNSDataJson.data as unknown as SNSType[]

interface ModalDemoProps {
	isInitiallyOpen?: boolean
	title: string
	description: string
}

const ModalDemo = ({ isInitiallyOpen = false, title, description }: ModalDemoProps) => {
	const [isOpen, setIsOpen] = useState(isInitiallyOpen)

	useEffect(() => {
		setIsOpen(isInitiallyOpen)
	}, [isInitiallyOpen])

	return (
		<div>
			<button onClick={() => setIsOpen(true)} className='rounded-md bg-primary px-4 py-2 text-primary-foreground'>
				Open Modal
			</button>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title} description={description} />
		</div>
	)
}

const meta = {
	title: 'Components/Modal',
	component: ModalDemo,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [
		(Story) => (
			<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
				<Layout SNSData={SNSData}>
					<div className='flex min-h-[calc(100dvh-10rem)] items-center justify-center'>
						<Story />
					</div>
				</Layout>
			</ThemeProvider>
		),
	],
	tags: ['autodocs'],
} satisfies Meta<typeof ModalDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		title: 'Example Modal',
		description: 'A simple modal dialog example with light and dark theme support.',
	},
}

export const WithoutTitle: Story = {
	args: {
		title: '',
		description: 'A modal without a title',
	},
}

export const LongContent: Story = {
	args: {
		title: 'Scrollable Content',
		description:
			'This modal demonstrates scrollable content behavior. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
	},
}
