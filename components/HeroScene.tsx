// @ts-nocheck
'use client'
import { Suspense, useRef, useMemo, useLayoutEffect, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import SnowParticles from './SnowParticles'
import dynamic from 'next/dynamic'
import { Star, parseStars } from '../utils/parseStars'
import { StarField } from './StarField'

// Constants from the original example
const GRD_SIZE = 2000 // Planeのサイズを大きく
const SEG_NUM = 120 // 分割数も増やしてなめらかに
const GRD_RCS = 1 // 1枚だけ描画
const WATER_NORMAL_SRC = 'https://threejs.org/examples/textures/waternormals.jpg'

// さらに等間隔＆高さアップの風紋
const moveWaveGLSL = `
  vec3 moveWave(vec3 p, float time_val, float grid_val){
      vec3 retVal = vec3(p.x, 0.0, p.z);
      float y = 0.0;
      // 丘陵のような起伏
      y += sin(p.x * 0.005) * 50.0;
      // 大きなうねり（弱め、z方向にもずらす）
      y += sin(p.x * 0.04 + p.z * 0.02) * 2.0;
      // 等間隔の風紋（z方向で位相をずらす）
      y += sin(p.x * 8.0) * 1.5;
      y += sin(p.x * 16.0) * 0.2;
      y += sin(p.x * 32.0) * 0.1;
      retVal.y = y;
      return retVal;
  }
`

// OceanTile Component
function OceanTile({ tilePosition, timeUniform, gridSize, segments, normalMap }) {
	const materialRef = useRef()

	const geometry = useMemo(() => {
		const geo = new THREE.PlaneGeometry(gridSize, gridSize, segments, segments)
		geo.rotateX(-Math.PI * 0.5) // Rotate to be horizontal (XZ plane)
		return geo
	}, [gridSize, segments])

	useLayoutEffect(() => {
		if (materialRef.current) {
			materialRef.current.onBeforeCompile = (shader) => {
				shader.uniforms.time = timeUniform.current // Pass the { value: ... } object
				shader.uniforms.grid = { value: gridSize }

				shader.vertexShader = `
          uniform float time;
          uniform float grid;  
          varying float vHeight;

          ${moveWaveGLSL} // Inject the moveWave function

          ${shader.vertexShader}
        `
					.replace(
						`#include <beginnormal_vertex>`,
						`#include <beginnormal_vertex>
            vec3 p_for_normal = position; // Original vertex position in object space
            vec3 wavePos_for_normal = moveWave(p_for_normal, time, grid);

            float epsilon = 0.1; 
            vec3 tangent = vec3(epsilon, 0.0, 0.0); // Offset in x
            vec3 bitangent = vec3(0.0, 0.0, epsilon); // Offset in z

            vec3 neighbor1Pos = moveWave(p_for_normal + tangent, time, grid);
            vec3 neighbor2Pos = moveWave(p_for_normal + bitangent, time, grid);
            
            vec3 displacedTangent = neighbor1Pos - wavePos_for_normal;
            vec3 displacedBitangent = neighbor2Pos - wavePos_for_normal;
            
            objectNormal = normalize(cross(displacedBitangent, displacedTangent)); 
          `
					)
					.replace(
						`#include <begin_vertex>`,
						`#include <begin_vertex>
            vec3 p_for_vertex = position; 
            vec3 wavePosition_for_vertex = moveWave(p_for_vertex, time, grid);
            transformed = vec3(p_for_vertex.x, wavePosition_for_vertex.y, p_for_vertex.z); // Set transformed y
            vHeight = wavePosition_for_vertex.y;
          `
					)

				shader.fragmentShader = `
          varying float vHeight;
          ${shader.fragmentShader}
        `.replace(
					`#include <color_fragment>`,
					`#include <color_fragment>
            // Modify diffuseColor (albedo) based on wave height
            diffuseColor.rgb = mix(vec3(0.7608, 0.698, 0.502), vec3(0.85, 0.8, 0.6), smoothstep(0.0, 6.0, vHeight));
            if (vHeight > 4.0) {
              diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.95, 0.92, 0.8), smoothstep(4.0, 7.0, vHeight));
            }
          `
				)
			}
			materialRef.current.needsUpdate = true
		}
	}, [timeUniform, gridSize, normalMap])

	return (
		<mesh position={tilePosition} geometry={geometry}>
			<meshStandardMaterial
				ref={materialRef}
				// normalMap={normalMap} // ← テクスチャを一旦コメントアウト
				metalness={0.5}
				roughness={0.6}
				color={'#C2B280'}
			/>
		</mesh>
	)
}

// OceanSurface Component (Manages tiles and animation time)
function OceanSurface() {
	const waterNormals = useLoader(THREE.TextureLoader, WATER_NORMAL_SRC)

	useMemo(() => {
		waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
		waterNormals.repeat.set(1, 1)
	}, [waterNormals])

	const time = useRef({ value: 0 }) // Uniform for shader
	const textureOffsetRef = useRef({ x: 0, y: 0 })

	// useFrame((state, delta) => {
	// 	time.current.value += delta // ← アニメーションを止めるためコメントアウト
	// 	textureOffsetRef.current.x -= 0.0005
	// 	textureOffsetRef.current.y += 0.00025
	// 	waterNormals.offset.set(textureOffsetRef.current.x, textureOffsetRef.current.y)
	// })

	const tiles = useMemo(() => {
		const arr = []
		const totalGridDim = GRD_RCS * GRD_SIZE
		const startOffset = -totalGridDim / 2 + GRD_SIZE / 2

		for (let z = 0; z < GRD_RCS; z++) {
			for (let x = 0; x < GRD_RCS; x++) {
				arr.push({
					id: `${x}-${z}`,
					position: [startOffset + x * GRD_SIZE, 0, startOffset + z * GRD_SIZE],
				})
			}
		}
		return arr
	}, [])

	return (
		<group>
			{tiles.map((tile) => (
				<OceanTile
					key={tile.id}
					tilePosition={tile.position}
					timeUniform={time}
					gridSize={GRD_SIZE}
					segments={SEG_NUM}
					normalMap={waterNormals}
				/>
			))}
		</group>
	)
}

// Main Scene Component
export default function HeroScene() {
	const [stars, setStars] = useState<Star[]>([])

	useEffect(() => {
		fetch('/stars_mag6.csv')
			.then((r) => r.text())
			.then((t) => setStars(parseStars(t)))
	}, [])

	return (
		<div className='w-full h-screen relative'>
			<div className='absolute inset-0 z-10'>
				<Canvas
					camera={{ position: [0, 150, 350], fov: 55, near: 1, far: 15000 }}
					onCreated={({ gl }) => {
						// gl.outputEncoding = THREE.sRGBEncoding
						if (gl.outputColorSpace !== undefined) {
							gl.outputColorSpace = THREE.SRGBColorSpace
						}
					}}
				>
					<StarField stars={stars} sphereRadius={200} />
					<color attach='background' args={['#1a1a2e']} />
					<Suspense fallback={null}>
						<OceanSurface />
						{/* <SnowParticles count={2000} area={2000} /> */}
					</Suspense>
					<ambientLight intensity={0.5} color={'#ffffff'} />
					<directionalLight color={'#ffffff'} intensity={1.0} position={[0, 2000, 0]} castShadow />
					<OrbitControls target={[0, 0, 0]} minDistance={50} maxDistance={2000} />
				</Canvas>
			</div>
		</div>
	)
}

