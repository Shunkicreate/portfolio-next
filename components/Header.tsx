import { useRouter } from 'next/router';
import { MouseEvent } from 'react';

const Header = () => {
	const router = useRouter();
	const handleClick = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, href: string) => {
		e.preventDefault()
		router.push(href)
	}

	const Pages = [
		{
			url: '/',
			display: 'Home'
		},
		{
			url: '/history',
			display: 'History'
		},
		{
			url: '/about',
			display: 'About me'
		},
		{
			url: '/contact',
			display: 'Contact'
		},
	]

	return (
		<header className="drop-shadow-sm">
			<div className='flex m-16 justify-end	'>
				{
					Pages.map((page, i) => {
						return (
							<div key={ i } className='px-8 text-lg'>
								<a href={ page.url } className="nav-link" onClick={ (e) => { handleClick(e, page.url) } } active-class="active-link">{ page.display }</a>
							</div>
						)

					})
				}
			</div>
		</header>
	)
}

export default Header