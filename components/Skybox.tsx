// components/Skybox.tsx
'use client'

import { useThree } from '@react-three/fiber'
import { useMemo, useEffect } from 'react'
import { MathUtils, Vector3 } from 'three'
import { Sky } from 'three/examples/jsm/objects/Sky.js'

interface SkyboxProps {
	/** 0 〜 24 の値で、24 時間制の「時刻」を指定します */
	timeOfDay: number
}

export default function Skybox({ timeOfDay }: SkyboxProps) {
	const { scene } = useThree()

	// ─── Sky を一度だけ生成 ─────────────────────────────────────
	const sky = useMemo(() => {
		const s = new Sky()
		s.scale.setScalar(450000) // 十分大きめにスケール

		if (timeOfDay >= 6 && timeOfDay <= 18) {
			// ── 昼用パラメータ
			// turbidity: 大気の濁り度
			// 目安：2.0〜4.0 - 低めにして空をスッキリと見せる
			// 2.0=澄んだ夏空、4.0=やや霞んだ空
			s.material.uniforms['turbidity'].value = 0.1

			// rayleigh: 空気分子による光の散乱
			// 目安：1.5〜2.5 - 青みを強めすぎず、自然なグラデーションを狙う
			// 1.5=控えめな青空、2.5=鮮やかな青空
			s.material.uniforms['rayleigh'].value = 0.05

			// mieCoefficient: 大気中の粒子による散乱強度
			// 目安：0.001〜0.005 - ミー散乱をほのかに効かせ、遠景にかすかに白みを混ぜる
			// 0.001=クリアな空、0.005=わずかに白みのある空
			s.material.uniforms['mieCoefficient'].value = 0.001

			// mieDirectionalG: 散乱の方向性
			// 目安：0.7〜0.8 - 前方散乱をやや強めにして、太陽周辺の「ハロー感」を演出
			// 0.7=穏やかなハロー、0.8=やや強めのハロー
			s.material.uniforms['mieDirectionalG'].value = 0.75
		} else {
			// ── 夜用パラメータ（空をかなり暗くする）
			// turbidity: 20に設定し、夜空をより暗く霞ませる
			s.material.uniforms['turbidity'].value = 20
			// rayleigh: 0に設定し、空気分子による散乱を抑えて暗い空
			s.material.uniforms['rayleigh'].value = 2.5
			// mieCoefficient: 10に設定し、強い散乱で光を拡散させ暗さを演出
			s.material.uniforms['mieCoefficient'].value = 10
			// mieDirectionalG: 0に設定し、散乱を均一にして夜空の自然な暗さを表現
			s.material.uniforms['mieDirectionalG'].value = 0.8
		}

		return s
	}, [timeOfDay])

	// ─── scene に追加／クリーンアップ ────────────────────────────
	useEffect(() => {
		scene.add(sky)
		return () => {
			scene.remove(sky)
		}
	}, [scene, sky])

	// ─── timeOfDay が変わるたびに太陽位置を計算して uniforms にセット ─────────────────
	useEffect(() => {
		// 太陽位置の計算
		// phi: 仰角（高度）- 夏の日中は5°〜15°で真上に近い位置に
		// theta: 方位角 - シーンの向きに合わせて調整（180°=南、0°=北、90°=東、270°=西）

		// 1. 時刻から仰角を計算（12時=最も高く、朝夕で低く）
		const baseElevation = Math.sin((timeOfDay / 24) * Math.PI * 2 - Math.PI / 2) * 90
		// 夏場は太陽がより高い位置に来るよう補正（+10°）
		const elevationDeg = baseElevation + (timeOfDay >= 6 && timeOfDay <= 18 ? 10 : 0)
		const elevationRad = MathUtils.degToRad(elevationDeg)

		// 2. 仰角から極角（phi）を計算
		const phi = Math.PI / 2 - elevationRad

		// 3. 方位角（theta）- ここでは南向き（180°）を基準に
		const theta = MathUtils.degToRad(180)

		// 4. 太陽位置を球面座標で設定
		const sunPosition = new Vector3().setFromSphericalCoords(1, phi, theta)
		sky.material.uniforms['sunPosition'].value = sunPosition.clone()
	}, [timeOfDay, sky])

	return null
}

