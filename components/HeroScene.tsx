// components/HeroScene.tsx
'use client'
import { OrbitControls } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { Suspense, useRef, useMemo, useLayoutEffect, useState, useEffect } from 'react'
import * as THREE from 'three'
import { Star, parseStars } from '../utils/star/parseStars'
import SnowParticles from './SnowParticles'
import { StarField } from './star/StarField'

const GRD_SIZE = 2000
const SEG_NUM = 120
const GRD_RCS = 1
const WATER_NORMAL_SRC = 'https://threejs.org/examples/textures/waternormals.jpg'

const moveWaveGLSL = `
  vec3 moveWave(vec3 p, float time_val, float grid_val){
      vec3 retVal = vec3(p.x, 0.0, p.z);
      float y = 0.0;
      y += sin(p.x * 0.005) * 50.0;
      y += sin(p.x * 0.04 + p.z * 0.02) * 2.0;
      y += sin(p.x * 8.0) * 1.5;
      y += sin(p.x * 16.0) * 0.2;
      y += sin(p.x * 32.0) * 0.1;
      retVal.y = y;
      return retVal;
  }
`

interface OceanTileProps {
	tilePosition: [number, number, number]
	timeUniform: React.MutableRefObject<{ value: number }>
	gridSize: number
	segments: number
	normalMap: THREE.Texture
}

interface Shader {
	uniforms: { [name: string]: { value: number } }
	vertexShader: string
	fragmentShader: string
}

function OceanTile({ tilePosition, timeUniform, gridSize, segments, normalMap }: OceanTileProps) {
	const materialRef = useRef<THREE.MeshStandardMaterial | null>(null)

	const geometry = useMemo(() => {
		const geo = new THREE.PlaneGeometry(gridSize, gridSize, segments, segments)
		geo.rotateX(-Math.PI * 0.5)
		return geo
	}, [gridSize, segments])

	useLayoutEffect(() => {
		if (materialRef.current) {
			materialRef.current.onBeforeCompile = (shader: Shader) => {
				shader.uniforms.time = timeUniform.current
				shader.uniforms.grid = { value: gridSize }

				shader.vertexShader = `
          uniform float time;
          uniform float grid;  
          varying float vHeight;

          ${moveWaveGLSL}

          ${shader.vertexShader}
        `
					.replace(
						'#include <beginnormal_vertex>',
						`#include <beginnormal_vertex>
            vec3 p_for_normal = position;
            vec3 wavePos_for_normal = moveWave(p_for_normal, time, grid);

            float epsilon = 0.1;
            vec3 tangent = vec3(epsilon, 0.0, 0.0);
            vec3 bitangent = vec3(0.0, 0.0, epsilon);

            vec3 neighbor1Pos = moveWave(p_for_normal + tangent, time, grid);
            vec3 neighbor2Pos = moveWave(p_for_normal + bitangent, time, grid);

            vec3 displacedTangent = neighbor1Pos - wavePos_for_normal;
            vec3 displacedBitangent = neighbor2Pos - wavePos_for_normal;

            objectNormal = normalize(cross(displacedBitangent, displacedTangent));
          `,
					)
					.replace(
						'#include <begin_vertex>',
						`#include <begin_vertex>
            vec3 p_for_vertex = position;
            vec3 wavePosition_for_vertex = moveWave(p_for_vertex, time, grid);
            transformed = vec3(p_for_vertex.x, wavePosition_for_vertex.y, p_for_vertex.z);
            vHeight = wavePosition_for_vertex.y;
          `,
					)

				shader.fragmentShader = `
          varying float vHeight;
          ${shader.fragmentShader}
        `.replace(
					'#include <color_fragment>',
					`#include <color_fragment>
            diffuseColor.rgb = mix(vec3(0.7608, 0.698, 0.502), vec3(0.85, 0.8, 0.6), smoothstep(0.0, 6.0, vHeight));
            if (vHeight > 4.0) {
              diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.95, 0.92, 0.8), smoothstep(4.0, 7.0, vHeight));
            }
          `,
				)
			}
			materialRef.current.needsUpdate = true
		}
	}, [timeUniform, gridSize, normalMap])

	return (
		<mesh position={tilePosition} geometry={geometry}>
			<meshStandardMaterial ref={materialRef} metalness={0.5} roughness={0.6} color={'#C2B280'} />
		</mesh>
	)
}

function OceanSurface() {
	const waterNormals = useLoader(THREE.TextureLoader, WATER_NORMAL_SRC)

	useMemo(() => {
		waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
		waterNormals.repeat.set(1, 1)
	}, [waterNormals])

	const time = useRef<{ value: number }>({ value: 0 })

	const tiles = useMemo(() => {
		const arr: { id: string; position: [number, number, number] }[] = []
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

export default function HeroScene() {
	const [stars, setStars] = useState<Star[]>([])

	useEffect(() => {
		fetch('/stars_mag6.csv')
			.then((r) => r.text())
			.then((t) => setStars(parseStars(t)))
			.catch((error) => {
				// eslint-disable-next-line no-console
				console.error('Error loading stars data:', error)
			})
	}, [])

	return (
		<div className='w-full h-screen relative'>
			<div className='absolute inset-0 z-10'>
				<Canvas
					camera={{ position: [0, 150, 350], fov: 55, near: 1, far: 15000 }}
					onCreated={({ gl }) => {
						if (gl.outputColorSpace !== undefined) {
							gl.outputColorSpace = THREE.SRGBColorSpace
						}
					}}
				>
					<StarField stars={stars} sphereRadius={200} />
					<color attach='background' args={['#1a1a2e']} />
					<Suspense fallback={null}>
						<OceanSurface />
						<SnowParticles count={2000} area={2000} />
					</Suspense>
					<ambientLight intensity={0.5} color={'#ffffff'} />
					<directionalLight color={'#ffffff'} intensity={1.0} position={[0, 2000, 0]} castShadow />
					<OrbitControls target={[0, 0, 0]} minDistance={50} maxDistance={2000} />
				</Canvas>
			</div>
		</div>
	)
}
