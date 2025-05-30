// components/StarField.tsx
'use client'
import React, { FC, useMemo } from 'react'
import * as THREE from 'three'
import { BufferGeometry, Float32BufferAttribute, PointsMaterial } from 'three'
import { Star } from '../utils/parseStars'

interface StarFieldProps {
	stars: Star[]
	sphereRadius?: number
}

/**
 * BufferGeometry + PointsMaterial を使った軽量星空レンダリング
 */
const StarField: FC<StarFieldProps> = ({ stars, sphereRadius = 100 }) => {
	const geometry = useMemo(() => {
		const positions = new Float32Array(stars.length * 3)
		stars.forEach((star, i) => {
			const ra = (star.raDeg * Math.PI) / 180
			const dec = (star.decDeg * Math.PI) / 180
			const cosDec = Math.cos(dec)
			positions[3 * i] = sphereRadius * cosDec * Math.cos(ra)
			positions[3 * i + 1] = sphereRadius * cosDec * Math.sin(ra)
			positions[3 * i + 2] = sphereRadius * Math.sin(dec)
		})
		const geo = new BufferGeometry()
		geo.setAttribute('position', new Float32BufferAttribute(positions, 3))
		return geo
	}, [stars, sphereRadius])

	const material = useMemo(() => {
		return new PointsMaterial({
			color: 0xffffff,
			size: 3,
			sizeAttenuation: true,
			transparent: true,
			opacity: 0.9,
			depthWrite: false,
		})
	}, [])

	return <points geometry={geometry} material={material} />
}

export default StarField
