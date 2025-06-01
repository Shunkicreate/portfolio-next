// utils/starColor.ts
import * as THREE from 'three'
import { MathUtils } from 'three'

/**
 * スペクトル型プリセット色（よりリアルで鮮やかな星の見た目を意識した例）
 *   参考: 天文学でよく使われる Hertzsprung–Russell diagram の星色マップなどに準拠
 */
const SPECTRAL: Record<string, string> = {
	O: '#9bb0ff', // 青白
	B: '#aabfff', // やや青みがかった白
	A: '#cad7ff', // 薄い白青
	F: '#f8f7ff', // 非常に薄い白
	G: '#fff4ea', // クリーム色（太陽系と同じイメージ）
	K: '#ffd2a1', // 薄いオレンジ～黄
	M: '#ffcc6f', // 橙赤～赤寄り
}

/** Ballesteros の式で B–V → 温度 (Kelvin) を計算 */
export function bvToTemp(bv: number): number {
	return 4600 * (1 / (0.92 * bv + 1.7) + 1 / (0.92 * bv + 0.62))
}

/** HSV → RGB 変換 (h: 0～360, s: 0～1, v: 0～1) */
function hsvToRgb(h: number, s: number, v: number) {
	const c = v * s
	const hp = h / 60
	const x = c * (1 - Math.abs((hp % 2) - 1))
	let r1 = 0,
		g1 = 0,
		b1 = 0

	if (0 <= hp && hp < 1) [r1, g1, b1] = [c, x, 0]
	else if (1 <= hp && hp < 2) [r1, g1, b1] = [x, c, 0]
	else if (2 <= hp && hp < 3) [r1, g1, b1] = [0, c, x]
	else if (3 <= hp && hp < 4) [r1, g1, b1] = [0, x, c]
	else if (4 <= hp && hp < 5) [r1, g1, b1] = [x, 0, c]
	else if (5 <= hp && hp < 6) [r1, g1, b1] = [c, 0, x]

	const m = v - c
	return { r: r1 + m, g: g1 + m, b: b1 + m }
}

/** 温度 (Kelvin) → THREE.Color (HSV 経由の簡易プランキアン近似) */
export function tempToColor(temp: number): THREE.Color {
	// (1) 温度を妥当な範囲にクリップ
	const MIN_TEMP = 2500 // 赤みの強い M 型星の底値あたり
	const MAX_TEMP = 40000 // 青白い O 型星の上限あたり
	const Tclamped = MathUtils.clamp(temp, MIN_TEMP, MAX_TEMP)

	// (2) Hue を計算（赤→青に振る例: M 型 (2500) で hue = 0°, O 型 (40000) で hue = 240°）
	const ratio = (Tclamped - MIN_TEMP) / (MAX_TEMP - MIN_TEMP) // 0～1
	const hue = (1 - ratio) * 0 + ratio * 240 // 0→240

	// (3) 彩度・明度を適宜設定（sat=1 は完全に鮮やか、val=0.8 はやや明るめ）
	const sat = 1.0
	const val = 0.8

	const { r, g, b } = hsvToRgb(hue, sat, val)
	return new THREE.Color(r, g, b)
}

/** Star 型（スペクトル型 or B–V）から THREE.Color を返す */
export function starColor(spType: string, bv: number): THREE.Color {
	// (1) スペクトル型プリセットが存在すればそれを優先
	const key = spType.charAt(0).toUpperCase()
	const hex = SPECTRAL[key]
	if (hex) {
		return new THREE.Color(hex)
	}

	// (2) プリセットがなければ B–V -> 温度 -> HSV -> RGB で色を生成
	const temp = bvToTemp(bv)
	return tempToColor(temp)
}

