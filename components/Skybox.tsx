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
			s.material.uniforms['turbidity'].value = 1 // 大気の霞み具合
			s.material.uniforms['rayleigh'].value = 0.1 // レイリー散乱の量
			s.material.uniforms['mieCoefficient'].value = 0.005 // ミー散乱強度
			s.material.uniforms['mieDirectionalG'].value = 0.8 // ミー散乱の指向性
		} else {
			// ── 夜用パラメータ（空をかなり暗くする）
			s.material.uniforms['turbidity'].value = 4 // 霞を強めて全体をくぐもらせる
			s.material.uniforms['rayleigh'].value = 0.0 // レイリー散乱をオフ
			s.material.uniforms['mieCoefficient'].value = 0.0 // ミー散乱をオフ
			s.material.uniforms['mieDirectionalG'].value = 0.0
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
		// timeOfDay (0〜24) を「太陽の高度（仰角）」にマッピングする計算例
		//   - 0 時 → 太陽が真下（仰角 -90°）
		//   - 6 時 → 地平線（仰角 0°）
		//   - 12 時 → 頂点（仰角 +90°）
		//   - 18 時 → 地平線→（仰角 0°）
		//   - 24 時 → 真下に戻る（仰角 -90°）
		//
		// まず角度をラジアン系で求め、そこから SkyShader の setFromSphericalCoords に合う φ (phi) を計算します。

		// 1. (0→−90, 6→0, 12→+90, 18→0, 24→−90) の正弦波マッピング
		const elevationDeg = Math.sin((timeOfDay / 24) * Math.PI * 2 - Math.PI / 2) * 90
		const elevationRad = MathUtils.degToRad(elevationDeg)

		// 2. three.js の SphericalCoord では φ (phi) が「Y 軸からの極角 (polar angle)」
		//    ─── φ = π/2 − 太陽の仰角(rad)  という関係になる
		const phi = Math.PI / 2 - elevationRad

		// 3. 方位 (azimuth) = θ は今回は仰角の平行移動のみ考慮 → 南北東西は固定 (例として 180° = 南)
		const theta = MathUtils.degToRad(180)

		// 4. 単位球上のベクトルに変換
		const sunPosition = new Vector3().setFromSphericalCoords(1, phi, theta)

		// 5. Sky のマテリアル uniform に sunPosition をコピー
		sky.material.uniforms['sunPosition'].value = sunPosition.clone()
	}, [timeOfDay, sky])

	return null
}
