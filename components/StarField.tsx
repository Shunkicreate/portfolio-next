// @ts-nocheck
'use client'
import React, { FC } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { StarPoints } from './StarPoints'
import { StarMaterial } from './StarMaterial'
import { Star } from '../utils/parseStars'

// 星の大きさの設定
const STAR_MIN_SIZE = 2.0 // 最小サイズ（ピクセル単位）
const STAR_MAX_SIZE = 50 // 最大サイズ（ピクセル単位）
const STAR_OPACITY = 0.9 // 星の不透明度

interface StarFieldProps {
	stars: Star[]
	sphereRadius: number
}

export const StarField: FC<StarFieldProps> = ({ stars, sphereRadius }) => {
	return (
		<>
			<ambientLight intensity={0.2} />
			<StarPoints stars={stars} sphereRadius={sphereRadius} />
			<StarMaterial minSize={STAR_MIN_SIZE} maxSize={STAR_MAX_SIZE} opacity={STAR_OPACITY} />
			<OrbitControls enableZoom />
		</>
	)
}

