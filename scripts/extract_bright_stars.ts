import * as fs from 'fs'
import * as path from 'path'

// 入力ファイルのパス
const INPUT_PATH = path.join(__dirname, '../public/vizier_votable.tsv')
// 1.5等星から20.5等星まで0.5刻みで累積的に出力
const MAG_LIMITS = Array.from({ length: 20 }, (_, i) => 1.5 + i)
const VMAG_INDEX = 10 // Vmagカラムのインデックス

// VOTable/TSVのパース（ヘッダー行とデータ行を分離）
function parseTSV(text: string) {
	const lines = text.split(/\r?\n/).filter(Boolean)
	// データ部分の開始を探す
	let dataStart = 0
	for (let i = 0; i < lines.length; i++) {
		if (lines[i].match(/^_RAJ2000/)) {
			dataStart = i
			break
		}
	}
	const header = lines[dataStart]
	const dataLines = lines.slice(dataStart + 1)
	return { header, dataLines }
}

// メイン処理
function main() {
	const raw = fs.readFileSync(INPUT_PATH, 'utf-8')
	const { header, dataLines } = parseTSV(raw)

	// 累積ファイル（N等星まで）
	MAG_LIMITS.forEach((mag, idx) => {
		const filtered = dataLines.filter((line) => {
			const cols = line.split(';')
			const vmag = parseFloat(cols[VMAG_INDEX])
			return !isNaN(vmag) && vmag <= mag
		})
		const out = [header, ...filtered].join('\n')
		const file = path.join(__dirname, `../public/stars_mag${idx + 1}.csv`)
		fs.writeFileSync(file, out, 'utf-8')
		console.log(`Wrote ${filtered.length} stars to ${file}`)
	})

	// 範囲ファイル（N等星のみ）
	for (let i = 0; i < MAG_LIMITS.length; i++) {
		const lower = i === 0 ? -Infinity : MAG_LIMITS[i - 1]
		const upper = MAG_LIMITS[i]
		const filtered = dataLines.filter((line) => {
			const cols = line.split(';')
			const vmag = parseFloat(cols[VMAG_INDEX])
			return !isNaN(vmag) && vmag > lower && vmag <= upper
		})
		const out = [header, ...filtered].join('\n')
		const file = path.join(__dirname, `../public/stars_mag${i + 1}_only.csv`)
		fs.writeFileSync(file, out, 'utf-8')
		console.log(`Wrote ${filtered.length} stars to ${file}`)
	}
}

main()
