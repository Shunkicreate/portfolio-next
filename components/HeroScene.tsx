// @ts-nocheck
'use client'
import { Suspense, useRef, useMemo, useLayoutEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Constants from the original example
const GRD_SIZE = 200 // Size of one grid tile (original GrdSiz)
const SEG_NUM = 30 // Segments per tile (original segNum, increased for smoother waves)
const GRD_RCS = 2 // Number of rows/columns for the grid (e.g., 2x2 grid)
const WATER_NORMAL_SRC = 'https://threejs.org/examples/textures/waternormals.jpg'

// GLSL moveWave function (adapted from original example)
const moveWaveGLSL = `
  vec3 moveWave(vec3 p, float time_val, float grid_val){
      vec3 retVal = vec3(p.x, 0.0, p.z); // Initialize y to 0 for calculations
      float ang;
      float kzx = 360.0/grid_val; 

      // Wave1 (135 degrees)
      ang = 50.0*time_val + (-1.0*p.x*kzx) + (-2.0*p.z*kzx);
      ang = mod(ang, 360.0);
      ang = ang * 0.0174532925; // PI / 180.0
      retVal.y += 3.0*sin(ang); // Accumulate wave heights

      // Wave2 (090)
      ang = 25.0*time_val + (-3.0*p.x*kzx);
      ang = mod(ang, 360.0);
      ang = ang * 0.0174532925;
      retVal.y += 2.0*sin(ang);

      // Wave3 (180 degrees)
      ang = 15.0*time_val - (3.0*p.z*kzx);
      ang = mod(ang, 360.0);
      ang = ang * 0.0174532925;
      retVal.y += 2.0*sin(ang);

      // Wave4 (225 degrees)
      ang = 50.0*time_val + (4.0*p.x*kzx) + (8.0*p.z*kzx);
      ang = mod(ang, 360.0);
      ang = ang * 0.0174532925;
      retVal.y += 0.5*sin(ang);

      // Wave5 (270 degrees)
      ang = 50.0*time_val + (8.0*p.x*kzx);
      ang = mod(ang, 360.0);
      ang = ang * 0.0174532925;
      retVal.y += 0.5*sin(ang);
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
            diffuseColor.rgb = mix(vec3(0.03125,0.0625,0.5), vec3(0.1,0.2,0.6), smoothstep(0.0, 6.0, vHeight));
            if (vHeight > 4.0) { // Adjusted foam threshold based on typical wave heights
              diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.8, 0.85, 0.9), smoothstep(4.0, 7.0, vHeight)); // Smoother foam
            }
          `
				)
			}
			// Important: Trigger recompile if not done automatically by R3F for onBeforeCompile
			materialRef.current.needsUpdate = true
		}
	}, [timeUniform, gridSize, normalMap]) // normalMap added as dep if it can change

	return (
		<mesh position={tilePosition} geometry={geometry}>
			<meshStandardMaterial
				ref={materialRef}
				normalMap={normalMap}
				metalness={0.5}
				roughness={0.6}
				color={0x081080} // Base water color (e.g., Navy from original)
			/>
		</mesh>
	)
}

// OceanSurface Component (Manages tiles and animation time)
function OceanSurface() {
	const waterNormals = useLoader(THREE.TextureLoader, WATER_NORMAL_SRC)

	useMemo(() => {
		// Configure texture properties once
		waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
		waterNormals.repeat.set(1, 1) // WtrRep was 1 in example
	}, [waterNormals])

	const time = useRef({ value: 0 }) // Uniform for shader
	const textureOffsetRef = useRef({ x: 0, y: 0 })

	useFrame((state, delta) => {
		time.current.value += delta // Update time for wave animation

		// Animate texture coordinates for scrolling effect
		textureOffsetRef.current.x -= 0.0005
		textureOffsetRef.current.y += 0.00025
		waterNormals.offset.set(textureOffsetRef.current.x, textureOffsetRef.current.y)
	})

	const tiles = useMemo(() => {
		const arr = []
		const totalGridDim = GRD_RCS * GRD_SIZE
		// Calculate starting offset to center the grid of tiles around [0,0,0]
		const startOffset = -totalGridDim / 2 + GRD_SIZE / 2

		for (let z = 0; z < GRD_RCS; z++) {
			for (let x = 0; x < GRD_RCS; x++) {
				arr.push({
					id: `${x}-${z}`,
					position: [
						startOffset + x * GRD_SIZE,
						0, // Tiles are positioned at y=0, shader handles height
						startOffset + z * GRD_SIZE,
					],
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
	return (
		<div className='w-full h-screen'>
			<Canvas
				camera={{ position: [0, 150, 350], fov: 55, near: 1, far: 15000 }} // Adjusted camera from example
				onCreated={({ gl }) => {
					gl.outputEncoding = THREE.sRGBEncoding // Match renderer outputEncoding
				}}
			>
				<color attach='background' args={[0xcccccc]} /> {/* Scene background color */}
				<Suspense fallback={null}>
					<OceanSurface />
				</Suspense>
				<ambientLight intensity={0.5} />
				<directionalLight
					color={0xffffff}
					intensity={1.0}
					position={[0, 2000, 0]} // High noon light from example
				/>
				<OrbitControls
					target={[0, 0, 0]} // Target center of the ocean
					minDistance={50}
					maxDistance={2000}
				/>
			</Canvas>
		</div>
	)
}
