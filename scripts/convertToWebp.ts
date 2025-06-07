import { glob } from 'glob'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const QUALITY = 80 // WebP品質（0-100）
const SOURCE_DIR = '../public/gallery' // 変換元の画像があるディレクトリ

async function convertToWebP() {
	try {
		// jpg, png, jpeg ファイルを検索
		const imageFiles = await glob(`${SOURCE_DIR}/**/*.{jpg,jpeg,png}`, { nodir: true })

		console.log(`Found ${imageFiles.length} images to convert`)

		for (const imagePath of imageFiles) {
			const outputPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp')

			// 出力先のディレクトリが存在することを確認
			const outputDir = path.dirname(outputPath)
			if (!fs.existsSync(outputDir)) {
				fs.mkdirSync(outputDir, { recursive: true })
			}

			// 画像を WebP に変換
			await sharp(imagePath).webp({ quality: QUALITY }).toFile(outputPath)

			const originalSize = fs.statSync(imagePath).size
			const webpSize = fs.statSync(outputPath).size
			const savings = (((originalSize - webpSize) / originalSize) * 100).toFixed(2)

			console.log(`Converted ${imagePath}`)
			console.log(`Size reduction: ${savings}% (${(originalSize / 1024).toFixed(2)}KB → ${(webpSize / 1024).toFixed(2)}KB)\n`)

			// 元の画像を削除
			fs.unlinkSync(imagePath)
			console.log(`Deleted original file: ${imagePath}\n`)
		}

		console.log('Conversion completed successfully!')
	} catch (error) {
		console.error('Error during conversion:', error)
	}
}

convertToWebP()

