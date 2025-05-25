import { promises as fs } from 'fs'
import path from 'path'
import { parse } from 'node-html-parser'
import HomeContent from '../components/HomeContent'
import { SiteType } from '../types/globals.type'

async function getCarouselImages() {
	const imgDirectory = path.join(process.cwd(), 'public/carousel')
	const fileContents = await fs.readdir(imgDirectory, 'utf8')
	return fileContents.map((file) => '/carousel/' + file)
}

async function getSiteData() {
	const getURL = async (url: string) => {
		const ogps: { property: string; content: string }[] = []
		await fetch(url)
			.then((res) => res.text())
			.then((text) => {
				const element = parse(text)
				const headElement = element.querySelector('head')
				if (headElement) {
					const headEls = headElement.querySelectorAll('*')
					Array.from(headEls).map((v) => {
						const prop = v.getAttribute('property')
						const content = v.getAttribute('content')
						if (!prop || !content) return
						ogps.push({ property: prop, content: content })
					})
				}
			})
		return ogps
	}

	const siteDirectory = path.join(process.cwd(), 'sitedata.json')
	const siteStringData = await fs.readFile(siteDirectory, 'utf8')
	const siteContents = JSON.parse(siteStringData) as { data: SiteType[] }
	const PropsSiteContents = siteContents.data

	const requestArgs = siteContents.data.map((site) => getURL(site.url))
	const results = await Promise.all(requestArgs)

	results.map((ogps, i) => {
		ogps.map((ogp) => {
			if (ogp.property == 'og:title') {
				PropsSiteContents[i].ogpTitle = ogp.content
			}
			if (ogp.property == 'og:type') {
				PropsSiteContents[i].ogpType = ogp.content
			}
			if (ogp.property == 'og:image') {
				PropsSiteContents[i].ogpImage = ogp.content
			}
			if (ogp.property == 'og:descriptin') {
				PropsSiteContents[i].ogpDescription = ogp.content
			}
			if (ogp.property == 'og:url') {
				PropsSiteContents[i].ogpUrl = ogp.content
			}
		})
	})

	return PropsSiteContents
}

export default async function Home() {
	const [imgs, siteData] = await Promise.all([getCarouselImages(), getSiteData()])

	return <HomeContent imgs={imgs} siteData={siteData} />
}

