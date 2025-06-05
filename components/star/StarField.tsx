'use client'
import { OrbitControls } from '@react-three/drei'
import React, { FC } from 'react'
import { Star } from '../../utils/star/parseStars'
import { StarPoints } from './StarPoints'

interface StarFieldProps {
	stars: Star[]
	sphereRadius: number
}

export const StarField: FC<StarFieldProps> = ({ stars, sphereRadius }) => {
	return (
		<>
			<StarPoints stars={stars} sphereRadius={sphereRadius} />
		</>
	)
}
