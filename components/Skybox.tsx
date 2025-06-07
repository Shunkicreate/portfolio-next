// components/Skybox.tsx
'use client'

import { useThree } from '@react-three/fiber'
import { useMemo, useEffect, useCallback } from 'react'
import { MathUtils, Vector3 } from 'three'
import { Sky } from 'three/examples/jsm/objects/Sky.js'

interface SkyboxProps {
	/** 0 〜 24 の値で、24 時間制の「時刻」を指定します */
	timeOfDay: number
}

export default function Skybox({ timeOfDay }: SkyboxProps) {
	const { scene } = useThree()

	// パラメータの計算を最適化
	const skyParameters = useMemo(() => {
		const isDay = timeOfDay >= 6 && timeOfDay <= 18
		return {
			turbidity: isDay ? 0.1 : 20,
			rayleigh: isDay ? 0.05 : 2.5,
			mieCoefficient: isDay ? 0.001 : 10,
			mieDirectionalG: isDay ? 0.75 : 0.8,
		}
	}, [timeOfDay])

	// Sky を一度だけ生成
	const sky = useMemo(() => {
		const s = new Sky()
		s.scale.setScalar(450000)

		// パラメータを設定
		s.material.uniforms['turbidity'].value = skyParameters.turbidity
		s.material.uniforms['rayleigh'].value = skyParameters.rayleigh
		s.material.uniforms['mieCoefficient'].value = skyParameters.mieCoefficient
		s.material.uniforms['mieDirectionalG'].value = skyParameters.mieDirectionalG

		return s
	}, [skyParameters])

	// 太陽位置の計算を最適化
	const updateSunPosition = useCallback(() => {
		const baseElevation = Math.sin((timeOfDay / 24) * Math.PI * 2 - Math.PI / 2) * 90
		const elevationDeg = baseElevation + (timeOfDay >= 6 && timeOfDay <= 18 ? 10 : 0)
		const elevationRad = MathUtils.degToRad(elevationDeg)
		const phi = Math.PI / 2 - elevationRad
		const theta = MathUtils.degToRad(180)
		return new Vector3().setFromSphericalCoords(1, phi, theta)
	}, [timeOfDay])

	// scene に追加／クリーンアップ
	useEffect(() => {
		scene.add(sky)
		return () => {
			scene.remove(sky)
		}
	}, [scene, sky])

	// timeOfDay が変わるたびに太陽位置を更新
	useEffect(() => {
		const sunPosition = updateSunPosition()
		sky.material.uniforms['sunPosition'].value = sunPosition
	}, [timeOfDay, sky, updateSunPosition])

	return null
}
