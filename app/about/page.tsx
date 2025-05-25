import { promises as fs } from 'fs'
import path from 'path'
import AboutContent from '../../components/AboutContent'

type rankType = {
	rank: number
	content: string
}

type Content = {
	title: string
	src: string
	rank: rankType[]
}

async function getAboutData() {
	const ContentDirectory = path.join(process.cwd(), 'aboutdata.json')
	const aboutContentsStringData = await fs.readFile(ContentDirectory, 'utf8')
	const aboutContents = JSON.parse(aboutContentsStringData) as { data: Content[] }
	return aboutContents.data
}

export default async function About() {
	const contents = await getAboutData()

	return (
		<main className='w-full md:w-3/4 lg:w-2/4 mx-auto'>
			<h1 className='text-2xl font-bold mb-8'>About</h1>
			{contents.map((content, i) => (
				<AboutContent key={i} content={content} />
			))}
		</main>
	)
}
