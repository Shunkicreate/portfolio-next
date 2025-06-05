import './globals.css'
import { Metadata } from 'next'
// eslint-disable-next-line camelcase
import { Inter, Noto_Serif_JP, Zen_Old_Mincho } from 'next/font/google'
import DynamicRootLayoutClient from './DynamicRootLayoutClient'

// フォントの設定を最適化
const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	preload: false,
	variable: '--font-inter',
})

const notoSerifJp = Noto_Serif_JP({
	subsets: ['latin'],
	weight: ['400'],
	display: 'swap',
	preload: false,
	variable: '--font-noto-serif',
})

const zenOldMincho = Zen_Old_Mincho({
	subsets: ['latin'],
	weight: ['400'],
	display: 'swap',
	preload: false,
	variable: '--font-zen-old-mincho',
})

export const metadata: Metadata = {
	title: 'Shunki Create',
	description: 'Portfolio site of Shunki Tada',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='ja' suppressHydrationWarning className={`${inter.variable} ${notoSerifJp.variable} ${zenOldMincho.variable}`}>
			<head>
				<style
					dangerouslySetInnerHTML={{
						__html: `
					:root {
						--background: #FAF8F6;
						--foreground: #1A1A1A;
					}
					@media (prefers-color-scheme: dark) {
						:root {
							--background: #1A1A1A;
							--foreground: #FAF8F6;
						}
					}
					body {
						margin: 0;
						background-color: var(--background);
						color: var(--foreground);
					}
				`,
					}}
				/>
			</head>
			<body>
				<DynamicRootLayoutClient>{children}</DynamicRootLayoutClient>
			</body>
		</html>
	)
}
