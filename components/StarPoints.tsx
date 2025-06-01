// components/StarPoints.tsx
'use client'
import React, { FC, useMemo } from 'react'
import { BufferGeometry, Float32BufferAttribute, MathUtils } from 'three'
import { Star } from '../utils/parseStars'
import { starColor } from '../utils/starColor'
import { StarMaterial } from './StarMaterial'

interface StarPointsProps {
	stars: Star[]
	sphereRadius: number
}

// 星の大きさの設定
const STAR_MIN_SIZE = 0.1 // 最小サイズ（シェーダーでの最小値）
const STAR_MAX_SIZE = 10 // 最大サイズ（シェーダーでの最大値）
const STAR_DISTANCE = 50 // 球面からの距離係数
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

		// デバッグ用：最初の10個の星の等級とサイズを表示
		console.log('First 10 stars magnitude and size:')
		stars.slice(0, 10).forEach((s, i) => {
			const size = magnitudeToSize(s.mag)
			console.log(`Star ${i}: mag=${s.mag.toFixed(2)}, size=${size.toFixed(3)}`)
		})

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
		// デバッグ用：サイズの統計情報を表示
		const minSize = Array.from(sz).reduce((min, val) => Math.min(min, val), Infinity)
		const maxSize = Array.from(sz).reduce((max, val) => Math.max(max, val), -Infinity)
		const avgSize = sz.reduce((a, b) => a + b, 0) / sz.length
		console.log(`Size stats: min=${minSize.toFixed(3)}, max=${maxSize.toFixed(3)}, avg=${avgSize.toFixed(3)}`)

		return { positions: pos, colors: col, sizes: sz }
	}, [stars, sphereRadius])

	// sizesのデータをデバッグ表示
	console.log('sizes:', sizes)
	console.log('sizes.length:', sizes.length)
	console.log('sizes.slice(0, 10):', sizes.slice(0, 10))

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

