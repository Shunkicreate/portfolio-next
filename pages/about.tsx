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

const About = () => {
	const contents: Content[] = [
		{
			title: 'Games',
			src: '/icons/game.svg',
			rank: [
				{
					rank: 1,
					content: 'スーパーマリオ',
				},
				{
					rank: 2,
					content: 'Genshin Impact',
				},
				{
					rank: 3,
					content: 'プロジェクトセカイ',
				},
			],
		},
		{
			title: 'Music',
			src: '/icons/music.svg',
			rank: [
				{
					rank: 1,
					content: 'Mr.Children',
				},
				{
					rank: 2,
					content: 'Vocaloid(Deco*27, wowaka)',
				},
				{
					rank: 3,
					content: 'Radwimps',
				},
			],
		},
		{
			title: 'Books',
			src: '/icons/books.svg',
			rank: [
				{
					rank: 1,
					content: '告白 湊かなえ',
				},
				{
					rank: 2,
					content: '砂漠 伊坂幸太郎',
				},
				{
					rank: 3,
					content: '蜜蜂と遠雷 奥田陸',
				},
			],
		},
		{
			title: 'PC',
			src: '/icons/pc.svg',
			rank: [
				{
					rank: 1,
					content: 'CPU: AMD Ryzen5 3600X',
				},
				{
					rank: 2,
					content: 'GPU: NVIDIA GeForce GTX1650',
				},
				{
					rank: 3,
					content: 'Memory: T-FORCE VULCAN Z DDR4-3200 8GB',
				},
			],
		},
		{
			title: 'Coding Lang',
			src: '/icons/code.svg',
			rank: [
				{
					rank: 1,
					content: 'Python',
				},
				{
					rank: 2,
					content: 'C',
				},
				{
					rank: 3,
					content: 'Next.js, React, Vue.js',
				},
				{
					rank: 4,
					content: 'Processing',
				},
				{
					rank: 5,
					content: 'GCP, Azure, AWS',
				},
			],
		},
	]
	return (
		<>
			<div>about</div>
			{contents.map((content, i) => {
				return <AboutContent key={i} content={content} />
			})}
		</>
	)
}
export default About
