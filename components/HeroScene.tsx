// components/HeroScene.tsx
'use client'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import { Suspense, useEffect, useState } from 'react'
import * as THREE from 'three'
import { Star, parseStars } from '../utils/star/parseStars'
import SnowParticles from './SnowParticles'
import { StarField } from './star/StarField'
import { DesertSurface } from './desert/DesertSurface'

export default function HeroScene() {
	const { resolvedTheme } = useTheme()
	const [stars, setStars] = useState<Star[]>([])

	useEffect(() => {
		fetch('/stars_mag6.csv')
			.then((r) => r.text())
			.then((t) => setStars(parseStars(t)))
			// eslint-disable-next-line no-console
			.catch((e) => console.error('stars CSV 読み込みエラー:', e))
	}, [])

	return (
		<div className='w-full h-screen relative'>
			<Canvas
				camera={{ position: [0, 150, 350], fov: 55, near: 1, far: 15000 }}
				onCreated={({ gl }) => {
					// Three.js v0.155 以降なら outputColorSpace で色空間を設定
					if (gl.outputColorSpace !== undefined) {
						gl.outputColorSpace = THREE.SRGBColorSpace
					}
				}}
			>
				{/* 背景色・ライト・コントロールは必要なら早めに宣言 */}
				<color attach='background' args={['#1a1a2e']} />
				<ambientLight intensity={0.5} color='#ffffff' />
				<directionalLight color='#ffffff' intensity={1.0} position={[0, 2000, 0]} castShadow />
				<OrbitControls target={[0, 100, 0]} minDistance={50} maxDistance={2000} autoRotate={true} autoRotateSpeed={0.5} />
				{/* 星のフィールドを Suspense でラップ */}
				<Suspense fallback={null}>
					{resolvedTheme === 'dark' && (
						<>
							<StarField stars={stars} sphereRadius={200} />
						</>
					)}
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


