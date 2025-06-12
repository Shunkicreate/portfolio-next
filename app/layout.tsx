// app/layout.tsx
import './globals.css'
import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import LayoutClient from './layout_client'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const siteUrl = 'https://shunki-create.com'

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: { default: 'Shunki Create', template: '%s | Shunki Create' },
	description: 'Portfolio site of Shunki Tada',
	alternates: { canonical: '/' },
	openGraph: {
		url: siteUrl,
		siteName: 'Shunki Create',
		title: 'Shunki Create',
		description: 'Portfolio site of Shunki Tada',
		type: 'website',
		images: [
			{
				url: `${siteUrl}/gallery/DSC04337_edited.webp`,
				width: 1200,
				height: 630,
				alt: 'Preview image of Shunki Create',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Shunki Create',
		description: 'Portfolio site of Shunki Tada',
		images: [`${siteUrl}/gallery/DSC04337_edited.webp`],
	},
}

// SSR でも SSG でもなく「完全静的生成」にする
export const dynamic = 'force-static'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='ja'>
			<body>
				<GoogleAnalytics />
				<LayoutClient>{children}</LayoutClient>
			</body>
		</html>
	)
}
