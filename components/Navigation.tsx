'use client'

import { Menu, X, Sun, Moon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect, useState, useCallback } from 'react'

const navItems = [
	{ href: '/', label: 'Home' },
	{ href: '/about', label: 'About' },
	{ href: '/projects', label: 'Projects' },
	{ href: '/gallery', label: 'Gallery' },
	{ href: 'https://note.com/shunki_create', label: 'Note', isExternal: true },
	{ href: 'https://qiita.com/Shunkicreate', label: 'Qiita', isExternal: true },
	{ href: 'https://github.com/Shunkicreate', label: 'GitHub', isExternal: true },
	{ href: 'https://twitter.com/Shunkicreate', label: 'X (Twitter)', isExternal: true },
]

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false)
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()
	const pathname = usePathname()

	// Hydration 対策：クライアントマウント後に true にする
	useEffect(() => {
		setMounted(true)
	}, [])

	const handleScroll = useCallback(() => {
		if (isOpen && window.scrollY > 100) {
			setIsOpen(false)
			document.body.style.overflow = ''
		}
	}, [isOpen])

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [handleScroll])

	const toggleMenu = useCallback(() => {
		setIsOpen((prev) => {
			const next = !prev
			document.body.style.overflow = next ? 'hidden' : ''
			return next
		})
	}, [])

	const closeMenu = useCallback(() => {
		setIsOpen(false)
		document.body.style.overflow = ''
	}, [])

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	const renderLink = (item: (typeof navItems)[0]) => {
		const baseProps = {
			href: item.href,
			className: `text-sm ${pathname === item.href ? 'text-primary' : 'text-foreground/60'}`,
			...(item.isExternal && { target: '_blank', rel: 'noopener noreferrer' }),
			children: item.label,
		}
		if (item.isExternal) {
			return <a key={item.href} {...baseProps} />
		}
		return <Link key={item.href} {...baseProps} />
	}

	return (
		<nav className='fixed top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border h-16'>
			<div className='container mx-auto px-4'>
				<div className='flex h-16 items-center justify-between'>
					<Link href='/' className='text-xl font-bold text-foreground hover:text-primary transition-colors' aria-label='Home'>
						Shunki Create
					</Link>

					<div className='hidden md:flex md:items-center md:space-x-8'>
						{navItems.filter((item) => !item.isExternal).map(renderLink)}
						<button
							onClick={toggleTheme}
							className='p-2 text-foreground/60 hover:text-primary transition-colors'
							// mounted が false の間はダミーの aria-label（たとえば "Toggle theme"）を入れておく
							aria-label={mounted ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme` : 'Toggle theme'}
						>
							{mounted ? (
								theme === 'dark' ? (
									<Sun size={20} />
								) : (
									<Moon size={20} />
								)
							) : (
								// マウント前はアイコンも出さないか、スケルトンを出す
								<span className='block w-5 h-5 bg-foreground/10 rounded' />
							)}
						</button>
					</div>

					<div className='flex md:hidden'>
						<button
							onClick={toggleTheme}
							className='p-2 text-foreground/60 hover:text-primary transition-colors'
							aria-label={mounted ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme` : 'Toggle theme'}
						>
							{mounted ? (
								theme === 'dark' ? (
									<Sun size={20} />
								) : (
									<Moon size={20} />
								)
							) : (
								<span className='block w-5 h-5 bg-foreground/10 rounded' />
							)}
						</button>
						<button
							onClick={toggleMenu}
							className='ml-2 p-2 text-foreground/60 hover:text-primary transition-colors'
							aria-expanded={isOpen}
							aria-label='Toggle menu'
						>
							{isOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>
			</div>

			<div
				className={`fixed inset-0 z-50 w-screen h-screen bg-background/95 backdrop-blur-sm transition-opacity duration-300 ease-in-out md:hidden ${
					isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
			>
				<div className='flex flex-col h-full'>
					<div className='flex items-center justify-between p-4 border-b border-border'>
						<h2 className='text-xl font-semibold'>Menu</h2>
						<button
							onClick={closeMenu}
							className='p-2 text-foreground/60 hover:text-primary transition-colors'
							aria-label='Close menu'
						>
							<X size={24} />
						</button>
					</div>
					<div className='flex-1 overflow-y-auto px-6 py-8'>
						<div className='grid gap-6'>
							<div className='space-y-4'>
								<h3 className='text-sm font-medium text-foreground/40 uppercase tracking-wider'>Pages</h3>
								<div className='grid gap-2'>
									{navItems
										.filter((item) => !item.isExternal)
										.map((item) => (
											<Link
												key={item.href}
												href={item.href}
												onClick={closeMenu}
												className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
													pathname === item.href
														? 'bg-primary/10 text-primary'
														: 'text-foreground/60 hover:bg-accent hover:text-foreground'
												}`}
											>
												{item.label}
											</Link>
										))}
								</div>
							</div>
							<div className='space-y-4'>
								<h3 className='text-sm font-medium text-foreground/40 uppercase tracking-wider'>External Links</h3>
								<div className='grid gap-2'>
									{navItems
										.filter((item) => item.isExternal)
										.map((item) => (
											<a
												key={item.href}
												href={item.href}
												target='_blank'
												rel='noopener noreferrer'
												onClick={closeMenu}
												className='block px-4 py-3 text-lg font-medium rounded-lg text-foreground/60 hover:bg-accent hover:text-foreground transition-colors'
											>
												{item.label}
											</a>
										))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}
