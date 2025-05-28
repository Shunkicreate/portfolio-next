'use client'

import { useEffect, useState, useCallback } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sun, Moon } from 'lucide-react'

const navItems = [
	{ href: '/', label: 'Home' },
	{ href: '/about', label: 'About' },
	{ href: '/projects', label: 'Projects' },
	{ href: '/gallery', label: 'Gallery' },
	{ href: '/contact', label: 'Contact' },
	{ href: 'https://note.com/shunki_create', label: 'Note', isExternal: true },
	{ href: 'https://qiita.com/Shunkicreate', label: 'Qiita', isExternal: true },
	{ href: 'https://github.com/Shunkicreate', label: 'GitHub', isExternal: true },
	{ href: 'https://twitter.com/shunki______', label: 'X (Twitter)', isExternal: true },
]

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false)
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()
	const pathname = usePathname()

	// ハイドレーション対策
	useEffect(() => {
		setMounted(true)
	}, [])

	// スクロール時のメニュー制御を改善
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

	// モバイルメニューの制御を改善
	const toggleMenu = useCallback(() => {
		setIsOpen((prev) => {
			const newState = !prev
			document.body.style.overflow = newState ? 'hidden' : ''
			return newState
		})
	}, [])

	// メニューを閉じる処理
	const closeMenu = useCallback(() => {
		setIsOpen(false)
		document.body.style.overflow = ''
	}, [])

	// テーマ切り替え
	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	// リンクコンポーネントのレンダリング
	const renderLink = (item: (typeof navItems)[0]) => {
		const linkProps = {
			key: item.href,
			href: item.href,
			className: `text-sm font-medium transition-colors hover:text-primary ${
				pathname === item.href ? 'text-primary' : 'text-foreground/60'
			}`,
			...(item.isExternal && {
				target: '_blank',
				rel: 'noopener noreferrer',
			}),
		}

		return item.isExternal ? <a {...linkProps}>{item.label}</a> : <Link {...linkProps}>{item.label}</Link>
	}

	return (
		<nav className='fixed top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border'>
			<div className='container mx-auto px-4'>
				<div className='flex h-16 items-center justify-between'>
					{/* ロゴ */}
					<Link href='/' className='text-xl font-bold text-foreground hover:text-primary transition-colors' aria-label='Home'>
						Shunki Create
					</Link>

					{/* デスクトップナビゲーション */}
					<div className='hidden md:flex md:items-center md:space-x-8'>
						{navItems.filter((item) => !item.isExternal).map(renderLink)}
						<button
							onClick={toggleTheme}
							className='p-2 text-foreground/60 hover:text-primary transition-colors'
							aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
						>
							{mounted && (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />)}
						</button>
					</div>

					{/* モバイルメニューボタン */}
					<div className='flex md:hidden'>
						<button
							onClick={toggleTheme}
							className='p-2 text-foreground/60 hover:text-primary transition-colors'
							aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
						>
							{mounted && (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />)}
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

			{/* モバイルメニュー */}
			<div
				className={`fixed inset-0 z-50 w-screen h-screen bg-background/95 backdrop-blur-sm transition-opacity duration-300 ease-in-out md:hidden ${
					isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
			>
				<div className='flex flex-col h-full'>
					{/* メニューヘッダー */}
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
					{/* メニュー項目 */}
					<div className='flex-1 overflow-y-auto px-6 py-8'>
						<div className='grid gap-6'>
							{/* 内部リンク */}
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
							{/* 外部リンク */}
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

