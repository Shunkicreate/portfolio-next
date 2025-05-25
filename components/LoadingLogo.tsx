'use client'

import { useEffect, useState, useRef } from 'react'
import { useTheme } from 'next-themes'

interface LoadingLogoProps {
	onLoadingComplete: () => void
}

export default function LoadingLogo({ onLoadingComplete }: LoadingLogoProps) {
	const [isVisible, setIsVisible] = useState(false)
	const { theme } = useTheme()
	const [isReducedMotion, setIsReducedMotion] = useState(false)
	const svgRef = useRef<HTMLDivElement>(null)
	const objectRef = useRef<HTMLObjectElement>(null)
	const hasAppliedStyles = useRef(false)
	const wrapperRef = useRef<HTMLDivElement>(null)
	const [pathsCount, setPathsCount] = useState(0)
	/* 秒→ミリ秒換算用に 2 種の定数を用意 */
	const DELAY_STEP_S = 0.15 // 1 文字ごとの遅延 (秒)
	const DRAW_S = 0.5 // 1 文字の描画時間
	const EXTRA_MS = 300 // 書き終わって静止させる時間
	const DELAY_STEP_MS = DELAY_STEP_S * 1000
	const DRAW_MS = DRAW_S * 500

	useEffect(() => {
		// prefers-reduced-motionの検出
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
		setIsReducedMotion(mediaQuery.matches)

		const handleChange = (e: MediaQueryListEvent) => {
			setIsReducedMotion(e.matches)
		}

		mediaQuery.addEventListener('change', handleChange)
		return () => mediaQuery.removeEventListener('change', handleChange)
	}, [])

	// SVGのスタイル適用を一度だけ行う
	useEffect(() => {
		fetch('/logo-outline.svg')
			.then((res) => res.text())
			.then((svgMarkup) => {
				if (!wrapperRef.current) return
				wrapperRef.current.innerHTML = svgMarkup // ← ここがポイント

				const paths = wrapperRef.current.querySelectorAll('path')
				setPathsCount(paths.length)
				paths.forEach((path, idx) => {
					const len = (path as SVGPathElement).getTotalLength()
					const delay = (paths.length - 1 - idx) * DELAY_STEP_S
					path.setAttribute(
						'style',
						`
               fill:none;
               stroke:currentColor;
               stroke-dasharray:${len};
               stroke-dashoffset:${len};
			   animation: draw ${DRAW_S}s ease forwards;
               animation-delay:${delay}s;
             `
					)
				})
				hasAppliedStyles.current = true
			})
	}, []) // 依存配列を空にして、マウント時に1回だけ実行


	// アニメーションの表示制御

	/* 表示制御 */
	useEffect(() => {
		setIsVisible(true)

		const total = isReducedMotion ? 800 : DRAW_MS + DELAY_STEP_MS * (pathsCount - 1) + EXTRA_MS // ← 計算済み

		const timer = setTimeout(() => {
			setIsVisible(false)
			setTimeout(onLoadingComplete, 500)
		}, total)

		return () => clearTimeout(timer)
	}, [onLoadingComplete, isReducedMotion, pathsCount])

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500
				${isVisible ? 'opacity-100' : 'opacity-0'}`}
		>
			<div ref={wrapperRef} className='relative w-64 h-32 text-foreground' aria-label='Shunki Create Logo' role='img' />
		</div>
	)
}


