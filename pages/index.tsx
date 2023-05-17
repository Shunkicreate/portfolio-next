import { promises as fs } from 'fs';
import path from 'path';
import { GetStaticProps } from 'next';
import { parse } from 'node-html-parser';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Carousel from '../components/HomeCarousel';
import SiteCard from '../components/SiteCard';
import TopTitle from '../components/TopTitle';
import { SNSType, SiteType } from '../types/globals.type';

type Props = {
	imgs?: string[];
	SNSData: SNSType[]
	siteData: SiteType[]
};

export const getStaticProps: GetStaticProps = async () => {
	const imgDirectory = path.join(process.cwd(), 'public/carousel');
	const fileContents = await fs.readdir(imgDirectory, 'utf8');
	for (let i = 0; i < fileContents.length; ++i) {
		fileContents[i] = '/carousel/' + fileContents[i]
	}
	const SNSDirectory = path.join(process.cwd(), 'SNSdata.json');
	const SNSStringData = await fs.readFile(SNSDirectory, 'utf8')
	type SNSDataType = {
		data: SNSType[]
	}
	const SNSContents = JSON.parse(SNSStringData) as SNSDataType
	const getURL = async (url: string) => {
		const ogps: { property: string, content: string }[] = []
		await fetch(url).then(res => res.text()).then(text => {
			const element = parse(text)
			const headElement = element.querySelector('head');
			if (headElement) {
				const headEls = headElement.querySelectorAll('*')
				Array.from(headEls).map(v => {
					const prop = v.getAttribute('property')
					const content = v.getAttribute('content')
					if (!prop || !content) return;
					ogps.push({ 'property': prop, 'content': content })
				})
			}
		})
		return ogps
	}
	const siteDirectory = path.join(process.cwd(), 'sitedata.json')
	type siteDataType = {
		data: SiteType[]
	}
	const siteStringData = await fs.readFile(siteDirectory, 'utf8')
	const siteContents = JSON.parse(siteStringData) as siteDataType
	const requestArgs = siteContents.data.map((site) => {
		return (getURL(site.url))
	})
	const PropsSiteContents = siteContents.data
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
	const props: Props = {
		imgs: fileContents,
		SNSData: SNSContents.data,
		siteData: PropsSiteContents
	};
	return {
		props: props,
	};
}

const Home = (props: Props) => {
	return (
		<>
			<Header />
			<main className="w-full md:w-3/4 lg:w-2/4 mx-auto">
				<TopTitle title='Home' />
				<div className='mx-auto'>
					<Carousel imgs={props.imgs} />
				</div>
				{
					props.siteData.map((site, i) => {
						return (
							<SiteCard site={site} key={i}></SiteCard>
						)
					})
				}
			</main>
			<Footer SNSData={props.SNSData} />
		</>
	)
}

export default Home