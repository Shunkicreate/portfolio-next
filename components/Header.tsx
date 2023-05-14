import { useRouter } from 'next/router';
import { MouseEvent } from 'react';

const Header = () => {
	const router = useRouter();
	const handleClick = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, href: string) => {
		e.preventDefault()
		router.push(href)
	}

	return (
		<header className="shadow-sm">
			<div id="nav">
				<ul className="nav justify-content-end">
					<li className="nav-item">
						<a href={ '/' } className="nav-link" onClick={ (e) => { handleClick(e, 'next-bus') } } active-class="active-link">Home</a>
					</li>
					<li className="nav-item">
						<a href={ '/history' } className="nav-link" onClick={ (e) => { handleClick(e, 'next-bus') } } active-class="active-link">History</a>
					</li>
					<li className="nav-item">
						<a href={ '/about' } className="nav-link" onClick={ (e) => { handleClick(e, 'next-bus') } } active-class="active-link">About me</a>
					</li>
					<li className="nav-item">
						<a href={ '/contact' } className="nav-link" onClick={ (e) => { handleClick(e, 'next-bus') } } active-class="active-link">Contact</a>
					</li>
				</ul>
			</div>
		</header>
	)
}

export default Header