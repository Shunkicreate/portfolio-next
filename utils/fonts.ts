// eslint-disable-next-line camelcase
import { Noto_Serif_JP, Zen_Old_Mincho } from 'next/font/google'

// 日本語フォントを遅延読み込み用に設定
export const notoSerifJp = Noto_Serif_JP({
	subsets: ['latin'],
	weight: ['400'],
	display: 'swap',
	preload: false,
	variable: '--font-noto-serif',
})

export const zenOldMincho = Zen_Old_Mincho({
	subsets: ['latin'],
	weight: ['400'],
	display: 'swap',
	preload: false,
	variable: '--font-zen-old-mincho',
})
