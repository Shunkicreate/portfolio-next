// app/layout.tsx など
import './globals.css'
import '@/styles/tailwind.css'
import { Metadata } from 'next'
import DynamicRootLayoutClient from './DynamicRootLayoutClient'

export const metadata: Metadata = {
	metadataBase: new URL('https://shunki-create.com'),
	title: { default: 'Shunki Create', template: '%s | Shunki Create' },
	description: 'Portfolio site of Shunki Tada',

	alternates: {
		canonical: '/',
	},

	openGraph: {
		url: '/',
		siteName: 'Shunki Create',
		title: 'Shunki Create',
		description: 'Portfolio site of Shunki Tada',
		type: 'website',
		images: [
			{
				url: '/gallery/DSC04337_edited.webp',
				width: 1200,
				height: 630,
				alt: 'Shunki Create ポートフォリオのプレビュー画像',
			},
		],
	},

	twitter: {
		card: 'summary_large_image',
		title: 'Shunki Create',
		description: 'Portfolio site of Shunki Tada',
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
