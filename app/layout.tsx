import './globals.css'
import '@/styles/tailwind.css'
import { Metadata } from 'next'
import DynamicRootLayoutClient from './DynamicRootLayoutClient'

export const metadata: Metadata = {
	metadataBase: new URL('https://shunki-create.com'),
	title: { default: 'Shunki Create', template: '%s | Shunki Create' },
	description: 'Portfolio site of Shunki Tada',
	openGraph: {
		images: ['/gallery/DSC04337_edited.webp'],
		url: '/',
		siteName: 'Shunki Create',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		images: ['/gallery/DSC04337_edited.webp'],
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
