// components/HeroScene.tsx
'use client'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useEffect } from 'react'
import * as THREE from 'three'
import { Star, parseStars } from '../utils/star/parseStars'
import SnowParticles from './SnowParticles'
import { StarField } from './star/StarField'

export default function HeroScene() {
	const [stars, setStars] = useState<Star[]>([])

	useEffect(() => {
		fetch('/stars_mag6.csv')
			.then((r) => r.text())
			.then((t) => setStars(parseStars(t)))
			.catch((error) => {
				// eslint-disable-next-line no-console
				console.error('Error loading stars data:', error)
			})
	}, [])

	return (
		<div className='w-full h-screen relative'>
			<div className='absolute inset-0 z-10'>
				<Canvas
					camera={{ position: [0, 150, 350], fov: 55, near: 1, far: 15000 }}
					onCreated={({ gl }) => {
						if (gl.outputColorSpace !== undefined) {
							gl.outputColorSpace = THREE.SRGBColorSpace
						}
					}}
				>
					<StarField stars={stars} sphereRadius={200} />
					<color attach='background' args={['#1a1a2e']} />
					<Suspense fallback={null}>
						<SnowParticles count={1000} area={2000} />
					</Suspense>
					<ambientLight intensity={0.5} color={'#ffffff'} />
					<directionalLight color={'#ffffff'} intensity={1.0} position={[0, 2000, 0]} castShadow />
					<OrbitControls target={[0, 0, 0]} minDistance={50} maxDistance={2000} />
				</Canvas>
			</div>
		</div>
	)
}
