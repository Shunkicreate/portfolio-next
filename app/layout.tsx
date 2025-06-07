import './globals.css'
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
			<head>
				<style
					dangerouslySetInnerHTML={{
						__html: `
					:root {
						--font-sans: ${systemFont};
					}
					body {
						margin: 0;
						font-family: var(--font-sans);
						-webkit-font-smoothing: antialiased;
						-moz-osx-font-smoothing: grayscale;
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
