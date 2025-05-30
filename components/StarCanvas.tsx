// components/StarCanvas.tsx
'use client'
import React, { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import StarField from './StarField'
import { parseStars, Star } from '../utils/parseStars'

const StarCanvas: React.FC = () => {
	const [stars, setStars] = useState<Star[]>([])
	useEffect(() => {
		fetch('/stars_mag4.csv')
			.then((r) => r.text())
			.then((txt) => setStars(parseStars(txt)))
			.catch((e) => console.error('星データ読み込みエラー', e))
	}, [])

	if (!stars.length) return <div style={{ color: 'white' }}>Loading stars…</div>

	return (
		<Canvas camera={{ position: [0, 0, 150], fov: 60 }} style={{ background: 'black' }}>
			<ambientLight intensity={0.1} />
			<StarField stars={stars} sphereRadius={150} />
			<OrbitControls />
		</Canvas>
	)
}

export default StarCanvas
