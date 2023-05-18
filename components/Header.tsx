import { useRouter } from 'next/router'
import { MouseEvent, useState } from 'react'

const Header = () => {
	const router = useRouter()
	const [ClickState, setClickState] = useState(false)
	const handleClick = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, href: string) => {
		e.preventDefault()
		void router.push(href)
	}

	const Pages = [
		{
			url: '/',
			display: 'Home',
		},
		{
			url: '/history',
			display: 'History',
		},
		{
			url: '/about',
			display: 'About me',
		},
		{
			url: '/contact',
			display: 'Contact',
		},
	]

	return (
		<header className='filter drop-shadow-lg'>
			<div className='flex py-4 lg:my-16 justify-end mx-4'>
				{Pages.map((page, i) => {
					return (
						<div key={i} className='mx-4 lg:mx-8 text-md font-semibold'>
							<a
								href={page.url}
								className='nav-link'
								onClick={(e) => {
									handleClick(e, page.url)
								}}
								active-class='active-link'
							>
								{page.display}
							</a>
						</div>
					)
				})}
			</div>
		</header>
	)
}

export default Header
