'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ThemeToggle } from './theme-toggle'

const Pages = [
	{ url: '/', display: 'Home' },
	{ url: '/history', display: 'History' },
	{ url: '/about', display: 'About me' },
	{ url: '/contact', display: 'Contact' },
] as const

export default function Header() {
	const pathname = usePathname()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<header className='sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b'>
			<nav className='container mx-auto px-4'>
				<div className='flex items-center justify-between h-16'>
					{/* モバイルメニューボタン */}
					<div className='lg:hidden'>
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className='p-2 rounded-md hover:bg-accent hover:text-accent-foreground'
							aria-label='Toggle menu'
						>
							<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								{isMenuOpen ? (
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
								) : (
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
								)}
							</svg>
						</button>
					</div>

					{/* デスクトップメニュー */}
					<div className='hidden lg:flex lg:items-center lg:space-x-8'>
						{Pages.map((page) => (
							<Link
								key={page.url}
								href={page.url}
								className={`text-sm font-medium transition-colors
									${pathname === page.url ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
							>
								{page.display}
							</Link>
						))}
					</div>

					{/* テーマ切り替えボタン */}
					<div className='flex items-center'>
						<ThemeToggle />
					</div>
				</div>

				{/* モバイルメニュー */}
				<div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden`}>
					<div className='px-2 pt-2 pb-3 space-y-1'>
						{Pages.map((page) => (
							<Link
								key={page.url}
								href={page.url}
								className={`block px-3 py-2 rounded-md text-base font-medium
									${pathname === page.url ? 'text-primary bg-accent' : 'text-muted-foreground hover:text-primary hover:bg-accent'}`}
							>
								{page.display}
							</Link>
						))}
					</div>
				</div>
			</nav>
		</header>
	)
}
