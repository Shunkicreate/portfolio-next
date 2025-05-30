// utils/parseStars.ts
import Papa from 'papaparse'

export interface Star {
	raDeg: number
	decDeg: number
	mag: number
}

/**
 * セミコロン区切りの TSV をパースして Star[] に変換
 */
export const parseStars = (text: string): Star[] => {
	const result = Papa.parse<{ _RAJ2000: number; _DEJ2000: number; Vmag: number }>(text, {
		delimiter: ';',
		header: true,
		dynamicTyping: true,
		skipEmptyLines: true,
	})
	return result.data.map((row) => ({
		raDeg: row._RAJ2000,
		decDeg: row._DEJ2000,
		mag: row.Vmag,
	}))
}
