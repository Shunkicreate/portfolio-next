// components/StarPoints.tsx
'use client'
import React, { FC, useMemo } from 'react'
import { BufferGeometry, Float32BufferAttribute } from 'three'
import { Star } from '../../utils/star/parseStars'
import { starColor } from '../../utils/star/starColor'
import { StarMaterial } from './StarMaterial'

interface StarPointsProps {
	stars: Star[]
	sphereRadius: number
}

// 星の大きさの設定
const STAR_MIN_SIZE = 0.1 // 最小サイズ（シェーダーでの最小値）
const STAR_MAX_SIZE = 10 // 最大サイズ（シェーダーでの最大値）
const STAR_DISTANCE = 10 // 球面からの距離係数
const SIZE_POWER = 1.5 // 差を強調しつつ極端すぎない
const MAG_MIN = 0.0
const MAG_MAX = 10.0 // 7.0や8.0に広げる

// 等級からサイズへの変換関数
const magnitudeToSize = (mag: number): number => {
	const normalizedMag = Math.max(0, Math.min(1, (mag - MAG_MIN) / (MAG_MAX - MAG_MIN)))
	const t = 1.0 - normalizedMag
	const scale = Math.pow(t, SIZE_POWER)
	return STAR_MIN_SIZE + (STAR_MAX_SIZE - STAR_MIN_SIZE) * scale
}

export const StarPoints: FC<StarPointsProps> = ({ stars, sphereRadius }) => {
	const { positions, colors, sizes } = useMemo(() => {
		const n = stars.length
		const pos = new Float32Array(n * 3)
		const col = new Float32Array(n * 3)
		const sz = new Float32Array(n)

		stars.forEach((s, i) => {
			const ra = (s.raDeg * Math.PI) / 180
			const dec = (s.decDeg * Math.PI) / 180
			const cosD = Math.cos(dec)

			// 球面配置
			pos[i * 3] = STAR_DISTANCE * sphereRadius * cosD * Math.cos(ra)
			pos[i * 3 + 1] = STAR_DISTANCE * sphereRadius * cosD * Math.sin(ra)
			pos[i * 3 + 2] = STAR_DISTANCE * sphereRadius * Math.sin(dec)

			// 色設定
			const c = starColor(s.spType, s.bv)
			col[i * 3] = c.r
			col[i * 3 + 1] = c.g
			col[i * 3 + 2] = c.b

			// サイズ計算 - 等級(mag)に応じて大きさを変える
			const normalizedSize = magnitudeToSize(s.mag)
			sz[i] = normalizedSize
		})
		return { positions: pos, colors: col, sizes: sz }
	}, [stars, sphereRadius])

	const geometry = useMemo(() => {
		const geo = new BufferGeometry()
		geo.setAttribute('position', new Float32BufferAttribute(positions, 3))
		geo.setAttribute('color', new Float32BufferAttribute(colors, 3))
		geo.setAttribute('size', new Float32BufferAttribute(sizes, 1))
		return geo
	}, [positions, colors, sizes])

	return (
		<points geometry={geometry}>
			<StarMaterial />
		</points>
	)
}
