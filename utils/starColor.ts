// utils/starColor.ts
import * as THREE from 'three'
import { MathUtils } from 'three'

/** スペクトル型プリセット色 */
const SPECTRAL: Record<string, string> = {
	O: '#66ccff',
	B: '#99ccff',
	A: '#ffffff',
	F: '#fff4e8',
	G: '#ffddaa',
	K: '#ffbb77',
	M: '#ff8855',
}

/** Ballesteros の式で B–V → 温度 */
export function bvToTemp(bv: number): number {
	return 4600 * (1 / (0.92 * bv + 1.7) + 1 / (0.92 * bv + 0.62))
}

/** 温度 → 色 (簡易プランキアン近似) */
export function tempToColor(temp: number): THREE.Color {
	// 実装例は省略。必要に応じて詳細なRGB変換ロジックを追加可能。
	const t = MathUtils.clamp(temp / 10000, 0, 1)
	return new THREE.Color(1, 1 - t, 1 - t * 0.5)
}

/** Star 型から THREE.Color を返す */
export function starColor(spType: string, bv: number): THREE.Color {
	const key = spType.charAt(0)
	const hex = SPECTRAL[key] ?? null
	if (hex) return new THREE.Color(hex)
	const temp = bvToTemp(bv)
	return tempToColor(temp)
}

