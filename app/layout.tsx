import './globals.css'
import '@/styles/tailwind.css'
import { Metadata } from 'next'
import DynamicRootLayoutClient from './DynamicRootLayoutClient'

// システムフォントを基本フォントとして設定
const systemFont = `-apple-system, BlinkMacSystemFont, "Segoe UI", 
  Roboto, "Helvetica Neue", Arial, "Noto Sans", 
  sans-serif, "Apple Color Emoji", "Segoe UI Emoji", 
  "Segoe UI Symbol", "Noto Color Emoji"`

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
