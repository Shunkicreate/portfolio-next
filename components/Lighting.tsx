// components/Lighting.tsx
'use client'

import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { ACESFilmicToneMapping, Color } from 'three'
import Skybox from './Skybox'

interface LightingProps {
	theme: 'light' | 'dark' | string
}

export default function Lighting({ theme }: LightingProps) {
	const { gl, scene } = useThree()

	useEffect(() => {
		// ACESFilmicToneMapping を使う例
		gl.toneMapping = ACESFilmicToneMapping

		if (theme === 'light') {
			gl.toneMappingExposure = 0.8 // 昼は露光強め
		} else {
			gl.toneMappingExposure = 0.3 // 夜は露光を弱めて、より暗く
		}
	}, [gl, theme])

	// Canvas 背景色は Skybox で表現するため、ここで scene.background をクリア
	useEffect(() => {
		// 空のColorを好きに設定しておく（Skybox があれば実質見えないが、一応設定）
		if (theme === 'light') {
			scene.background = new Color(0x87ceeb) // 昼っぽい薄い水色 (参考)
		} else {
			scene.background = new Color(0x040033) // 夜っぽい紺色 (参考)
		}
	}, [theme, scene])

	// テーマに応じて「時刻 (0～24)」を割り当てる
	const timeOfDay = theme === 'light' ? 15 : 0

	return (
		<>
			{/* Skybox: timeOfDay に応じて昼夜の空を描く */}
			<Skybox timeOfDay={timeOfDay} />

			{/* 
        ↓ 以下はスカイシェーダーだけでは若干暗くなるので、
        必要に応じて補助的なライトを追加 
      */}
			{theme === 'light' ? (
				<>
					{/* 昼用: 全体を明るく照らすアンビエントライト */}
					<ambientLight color='#ffffff' intensity={2.0} />
					{/* 太陽光のようなディレクショナルライト（影あり／高強度） */}
					<directionalLight
						color='#ffffff'
						intensity={1.0}
						position={[0, 1000, 0]}
						castShadow
						shadow-mapSize-width={1024}
						shadow-mapSize-height={1024}
						shadow-camera-left={-200}
						shadow-camera-right={200}
						shadow-camera-top={200}
						shadow-camera-bottom={-200}
					/>
				</>
			) : (
				<></>
			)}
		</>
	)
}

