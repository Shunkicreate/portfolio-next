'use client'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'

// Three.jsコンポーネントを動的インポート
const ThreeCanvas = dynamic(() => import('@/components/ThreeCanvas'), {
	ssr: false,
	loading: () => <div className='w-full h-screen bg-background' />,
})

interface HeroCanvasProps {
	className?: string
}

export default function HeroCanvas({ className = '' }: HeroCanvasProps) {
	const [isReducedMotion, setIsReducedMotion] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
	const { theme } = useTheme()
	const containerRef = useRef<HTMLDivElement>(null)

	// モバイルとアニメーション設定の検出
	useEffect(() => {
		const checkDevice = () => {
			setIsMobile(window.innerWidth <= 768)
		}

		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
		setIsReducedMotion(mediaQuery.matches)

		const handleMotionChange = (e: MediaQueryListEvent) => {
			setIsReducedMotion(e.matches)
		}

		checkDevice()
		window.addEventListener('resize', checkDevice)
		mediaQuery.addEventListener('change', handleMotionChange)

		return () => {
			window.removeEventListener('resize', checkDevice)
			mediaQuery.removeEventListener('change', handleMotionChange)
		}
	}, [])

	// フォールバック用の静的な背景
	if (isReducedMotion || isMobile) {
		return (
			<div ref={containerRef} className={`relative w-full h-screen overflow-hidden bg-background ${className}`}>
				<div className='absolute inset-0 bg-gradient-to-b from-background/80 to-background' />
				<div className='absolute inset-0 bg-[url("/hero-fallback.jpg")] bg-cover bg-center opacity-20' />
				{/* 雪のエフェクトはCSSで実装 */}
				<div className='snow-container' />
			</div>
		)
	}

	return (
		<div ref={containerRef} className={`relative w-full h-screen overflow-hidden ${className}`}>
			<ThreeCanvas theme={theme} />
		</div>
	)
}
