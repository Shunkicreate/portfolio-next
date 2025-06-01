// utils/parseStars.ts
import Papa from 'papaparse'

export interface Star {
	raDeg: number
	decDeg: number
	mag: number
	bv: number
	spType: string
}

/** TSV をパースして Star[] に変換 */
export const parseStars = (text: string): Star[] => {
	const result = Papa.parse<{ _RAJ2000: number; _DEJ2000: number; Vmag: number; 'B-V': number; SpType: string }>(text, {
		delimiter: ';',
		header: true,
		dynamicTyping: true,
		skipEmptyLines: true,
	})
	return result.data.map((r) => ({
		raDeg: r._RAJ2000,
		decDeg: r._DEJ2000,
		mag: r.Vmag,
		bv: r['B-V'],
		spType: r.SpType.trim(),
	}))
}

