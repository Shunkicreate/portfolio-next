// @ts-nocheck
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function SnowParticles({ count = 2000, area = 2000, radius = 2 }) {
    const SNOW_FALLING_START_HEIGHT = 1000
    const SNOW_FALLING_SPEED = 60
    const SPHERE_SEGMENTS = 8
    const SNOW_OPACITY = 0.8
    const SNOW_COLOR = '#ffffff'
    const SNOW_EMISSIVE = '#404040' // 発光色を追加
    const GROUND_LEVEL = 0

	// 初期位置を保持する Float32Array
	const positions = useMemo(() => {
		const arr = new Float32Array(count * 3)
		for (let i = 0; i < count; i++) {
			arr[i * 3] = (Math.random() - 0.5) * area
			arr[i * 3 + 1] = Math.random() * SNOW_FALLING_START_HEIGHT + SNOW_FALLING_START_HEIGHT // より高い位置から開始
			arr[i * 3 + 2] = (Math.random() - 0.5) * area
		}
		return arr
	}, [count, area])

	const meshRef = useRef()
	const dummy = useMemo(() => new THREE.Object3D(), [])

	useFrame((_, delta) => {
		const pos = positions
		for (let i = 0; i < count; i++) {
			// Y座標を更新（地面を超えたらリサイクル）
			let y = pos[i * 3 + 1] - delta * SNOW_FALLING_SPEED
			if (y < GROUND_LEVEL) y = Math.random() * SNOW_FALLING_START_HEIGHT + SNOW_FALLING_START_HEIGHT // リサイクル時もより高い位置へ
			pos[i * 3 + 1] = y

			// ダミーオブジェクトにマトリクスをセット
			dummy.position.set(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2])
			dummy.updateMatrix()
			meshRef.current.setMatrixAt(i, dummy.matrix)
		}
		meshRef.current.instanceMatrix.needsUpdate = true
	})

	return (
		<instancedMesh
			ref={meshRef}
			args={[
				undefined, // geometry を children で指定
				undefined, // material を children で指定
				count, // インスタンス数
			]}
			frustumCulled={false}
		>
			{/* 球体ジオメトリ、セグメントは軽めに */}
			{/* <sphereBufferGeometry args={[radius, 8, 8]} /> */}
			<sphereGeometry args={[radius, SPHERE_SEGMENTS, SPHERE_SEGMENTS]} />
			<meshStandardMaterial color={SNOW_COLOR} transparent opacity={SNOW_OPACITY} depthWrite={false} />{' '}
		</instancedMesh>
	)
}

export default SnowParticles

