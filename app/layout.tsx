import './globals.css'
import '@/styles/tailwind.css'
import { Metadata } from 'next'
import DynamicRootLayoutClient from './DynamicRootLayoutClient'

export const metadata: Metadata = {
	title: {
		default: 'Shunki Create',
		template: '%s | Shunki Create',
	},
	description: 'Portfolio site of Shunki Tada',
	openGraph: {
		title: 'Shunki Create',
		description: 'Portfolio site of Shunki Tada',
		type: 'website',
	},
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='ja' suppressHydrationWarning>
			<head />
			<body>
				<DynamicRootLayoutClient>{children}</DynamicRootLayoutClient>
			</body>
		</html>
	)
}
