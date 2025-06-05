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
						--background: #FAF8F6;
						--foreground: #1A1A1A;
						--font-sans: ${systemFont};
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

