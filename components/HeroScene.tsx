// components/HeroScene.tsx
'use client'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import { Suspense, useEffect, useState, lazy } from 'react'
import * as THREE from 'three'
import { Star } from '../utils/star/parseStars'
import Lighting from './Lighting'

// Lazy load heavy components
const StarField = lazy(() => import('./star/StarField').then((mod) => ({ default: mod.StarField })))
const DesertSurface = lazy(() => import('./desert/DesertSurface').then((mod) => ({ default: mod.DesertSurface })))
const SnowParticles = lazy(() => import('./SnowParticles'))

async function fetchStars(): Promise<Star[]> {
	try {
		const response = await fetch('/stars_mag6.csv')
		const text = await response.text()
		const { parseStars } = await import('../utils/star/parseStars')
		return parseStars(text)
	} catch (_) {
		return []
	}
}

export default function HeroScene() {
	const { resolvedTheme } = useTheme()
	const [stars, setStars] = useState<Star[]>([])

	useEffect(() => {
		// Only fetch stars data when dark theme is active
		if (resolvedTheme === 'dark') {
			void fetchStars().then(setStars)
		}
	}, [resolvedTheme])

	return (
		<div className='relative w-full h-full'>
			<Canvas
				className='w-full h-full'
				style={{ height: 'calc(100dvh - 4rem)', width: '100%' }}
				camera={{ position: [10, 5, 10], fov: 55, near: 1, far: 15000 }}
				onCreated={({ gl }) => {
					// Three.js v0.155 以降なら outputColorSpace で色空間を設定
					if (gl.outputColorSpace !== undefined) {
						gl.outputColorSpace = THREE.SRGBColorSpace
					}
				}}
			>
				{/* 背景色・ライト・コントロールは必要なら早めに宣言 */}
				{/* ライティングはここで統一して管理 */}
				<Lighting theme={resolvedTheme || 'light'} />

				<OrbitControls
					target={[0, 10, 0]}
					minDistance={50}
					maxDistance={2000}
					autoRotate={true}
					autoRotateSpeed={0.5}
					// minPolarAngle={Math.PI / 4} // 45度（より強い見上げ角度）
					// maxPolarAngle={Math.PI / 2.5} // 72度（水平よりやや下向き制限）
					enableDamping={true}
					dampingFactor={0.05}
				/>
				{/* 星のフィールドを Suspense でラップ */}
				<Suspense
					fallback={
						<mesh>
							<boxGeometry args={[1, 1, 1]} />
							<meshStandardMaterial color='gray' />
						</mesh>
					}
				>
					{resolvedTheme === 'dark' && stars.length > 0 && <StarField stars={stars} sphereRadius={200} />}
					{resolvedTheme === 'light' && (
						<>
							<DesertSurface />
							<SnowParticles count={500} area={2000} />
						</>
					)}
				</Suspense>
			</Canvas>
		</div>
	)
}
