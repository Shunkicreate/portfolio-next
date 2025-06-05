import './globals.css'
import type { Metadata } from 'next'
// eslint-disable-next-line camelcase
import { Noto_Serif_JP, Zen_Old_Mincho, Inter } from 'next/font/google'
import DynamicRootLayoutClient from './DynamicRootLayoutClient'

const notoSerif = Noto_Serif_JP({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-noto-serif',
	display: 'swap',
})

const zenOldMincho = Zen_Old_Mincho({
	weight: ['400', '700'],
	subsets: ['latin'],
	variable: '--font-zen-old-mincho',
	display: 'swap',
})

const inter = Inter({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-inter',
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'Shunki Create',
	description: 'Portfolio site of Shunki Tada',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className={`${notoSerif.variable} ${zenOldMincho.variable} ${inter.variable}`} suppressHydrationWarning>
			<body>
				<DynamicRootLayoutClient>{children}</DynamicRootLayoutClient>
			</body>
		</html>
	)
}
