import fs from 'fs/promises'
import fetch from 'node-fetch'
import * as cheerio from 'cheerio'
import path from 'path'

async function fetchOGPImage(url) {
	try {
		const res = await fetch(url, { timeout: 10000 })
		const html = await res.text()
		const $ = cheerio.load(html)
		const ogImage = $('meta[property="og:image"]').attr('content')
		return ogImage || ''
	} catch (e) {
		console.error(`Failed to fetch OGP for ${url}:`, e.message)
		return ''
	}
}

async function main() {
	const filePath = path.join(process.cwd(), 'sitedata.json')
	const json = JSON.parse(await fs.readFile(filePath, 'utf8'))
	for (const project of json.data) {
		project.ogpImage = await fetchOGPImage(project.url)
		console.log(`${project.name}: ${project.ogpImage}`)
	}
	await fs.writeFile(filePath, JSON.stringify(json, null, 2), 'utf8')
	console.log('OGP画像の取得と保存が完了しました。')
}

main()

