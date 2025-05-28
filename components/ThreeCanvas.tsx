'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import '@types/three'
import { gsap } from 'gsap'

interface ThreeCanvasProps {
	theme?: string
}

export default function ThreeCanvas({ theme = 'light' }: ThreeCanvasProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const sceneRef = useRef<THREE.Scene>(null)
	const cameraRef = useRef<THREE.PerspectiveCamera>(null)
	const rendererRef = useRef<THREE.WebGLRenderer>(null)
	const particlesRef = useRef<THREE.InstancedMesh>(null)
	const animationRef = useRef<number>(null)

	// シーンの初期化
	useEffect(() => {
		if (!containerRef.current) return

		// シーンの設定
		const scene = new THREE.Scene()
		sceneRef.current = scene

		// カメラの設定
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
		camera.position.z = 5
		cameraRef.current = camera

		// レンダラーの設定
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
		renderer.setSize(window.innerWidth, window.innerHeight)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		containerRef.current.appendChild(renderer.domElement)
		rendererRef.current = renderer

		// パーティクルの設定
		const particleCount = 1000
		const geometry = new THREE.BufferGeometry()
		const positions = new Float32Array(particleCount * 3)
		const colors = new Float32Array(particleCount * 3)

		for (let i = 0; i < particleCount; i++) {
			positions[i * 3] = (Math.random() - 0.5) * 10
			positions[i * 3 + 1] = Math.random() * 10
			positions[i * 3 + 2] = (Math.random() - 0.5) * 10

			colors[i * 3] = 1
			colors[i * 3 + 1] = 1
			colors[i * 3 + 2] = 1
		}

		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
		geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

		const material = new THREE.PointsMaterial({
			size: 0.05,
			vertexColors: true,
			transparent: true,
			opacity: 0.8,
		})

		const particles = new THREE.InstancedMesh(geometry, material, particleCount)
		scene.add(particles)
		particlesRef.current = particles

		// アニメーション
		const animate = () => {
			if (!particlesRef.current) return

			particlesRef.current.rotation.y += 0.001
			particlesRef.current.position.y -= 0.01

			if (particlesRef.current.position.y < -5) {
				particlesRef.current.position.y = 5
			}

			renderer.render(scene, camera)
			animationRef.current = requestAnimationFrame(animate)
		}

		animate()

		// リサイズハンドラ
		const handleResize = () => {
			if (!cameraRef.current || !rendererRef.current) return

			cameraRef.current.aspect = window.innerWidth / window.innerHeight
			cameraRef.current.updateProjectionMatrix()
			rendererRef.current.setSize(window.innerWidth, window.innerHeight)
		}

		window.addEventListener('resize', handleResize)

		// GSAPアニメーション
		gsap.from(camera.position, {
			z: 10,
			duration: 2,
			ease: 'power2.out',
		})

		gsap.from(particles.position, {
			y: 10,
			duration: 2,
			ease: 'power2.out',
		})

		return () => {
			window.removeEventListener('resize', handleResize)
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current)
			}
			if (containerRef.current && rendererRef.current) {
				containerRef.current.removeChild(rendererRef.current.domElement)
			}
			geometry.dispose()
			material.dispose()
		}
	}, [])

	// テーマの変更に応じてパーティクルの色を更新
	useEffect(() => {
		if (!particlesRef.current) return

		const color = theme === 'dark' ? 0xffffff : 0x000000
		;(particlesRef.current.material as THREE.PointsMaterial).color.setHex(color)
	}, [theme])

	return <div ref={containerRef} className='absolute inset-0' />
}

