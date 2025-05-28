import './globals.css'
import type { Metadata } from 'next'
import Layout from '../components/Layout'
import { type SNSType } from '../types/globals.type'
import { Noto_Serif_JP, Zen_Old_Mincho, Inter } from 'next/font/google'
import { ThemeProvider } from '../components/theme-provider'
import Navigation from '@/components/Navigation'

const notoSerifJP = Noto_Serif_JP({
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

const SNSData: SNSType[] = [
	{
		src: '/icons/instagram.svg',
		link: 'https://www.instagram.com/shunki__t',
		SNS: 'instagram',
	},
	{
		src: '/icons/twitter.svg',
		link: 'https://twitter.com/shunki______',
		SNS: 'twitter',
	},
	{
		src: '/icons/mail.svg',
		link: 'mailto:jmsrsyunrinsyunki@gmail.com',
		SNS: 'mail',
	},
	{
		src: '/icons/facebook.svg',
		link: 'https://www.facebook.com/profile.php?id=100010753628988',
		SNS: 'facebook',
	},
	{
		src: '/icons/linkedin.svg',
		link: 'https://www.linkedin.com/in/%E9%A7%BF%E5%B8%8C-%E5%A4%9A%E7%94%B0-1450891a7/',
		SNS: 'linkedin',
	},
	{
		src: '/icons/github.svg',
		link: 'https://github.com/Shunkicreate/',
		SNS: 'github',
	},
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className={`${notoSerifJP.variable} ${zenOldMincho.variable} ${inter.variable}`} suppressHydrationWarning>
			<body>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
					<Navigation />
					<main className='min-h-screen pt-16'>
						<Layout SNSData={SNSData}>{children}</Layout>
					</main>
				</ThemeProvider>
			</body>
		</html>
	)
}

