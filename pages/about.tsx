import { promises as fs } from 'fs'
import path from 'path'
import { GetServerSideProps } from 'next'
import AboutContent from '../components/AboutContent'

type rankType = {
	rank: number
	content: string
}
type Content = {
	title: string
	src: string
	rank: rankType[]
}

type Props = {
	contents: Content[]
}

export const getServerSideProps: GetServerSideProps = async () => {
	const ContentDirectory = path.join(process.cwd(), 'aboutdata.json')
	type ContentDataType = {
		data: Content[]
	}
	const aboutContentsStringData = await fs.readFile(ContentDirectory, 'utf8')
	const aboutContents = JSON.parse(aboutContentsStringData) as ContentDataType
	const PropsAboutContents = aboutContents.data
	const props: Props = {
		contents: PropsAboutContents,
	}

	return {
		props: props,
	}
}

const About = (props: Props) => {
	return (
		<>
			<div>about</div>
			{props.contents.map((content, i) => {
				return <AboutContent key={i} content={content} />
			})}
		</>
	)
}
export default About
