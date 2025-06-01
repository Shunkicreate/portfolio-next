// utils/texture.ts
import { CanvasTexture } from 'three'

/** 単色円形テクスチャを生成 */
export function createCircleTexture(size = 32): CanvasTexture {
	const canvas = document.createElement('canvas')
	canvas.width = canvas.height = size
	const ctx = canvas.getContext('2d')!
	ctx.fillStyle = '#fff'
	ctx.beginPath()
	ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
	ctx.fill()
	return new CanvasTexture(canvas)
}

