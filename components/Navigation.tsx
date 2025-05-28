'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sun, Moon } from 'lucide-react'

const navItems = [
	{ href: '/', label: 'Home' },
	{ href: '/projects', label: 'Projects' },
	{ href: '/gallery', label: 'Gallery' },
	{ href: '/contact', label: 'Contact' },
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

	// スクロール時のメニュー制御
	useEffect(() => {
		const handleScroll = () => {
			if (isOpen) {
				setIsOpen(false)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [isOpen])

	// モバイルメニューの制御
	const toggleMenu = () => {
		setIsOpen(!isOpen)
		document.body.style.overflow = !isOpen ? 'hidden' : ''
	}

	// テーマ切り替え
	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
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
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={`text-sm font-medium transition-colors hover:text-primary ${
									pathname === item.href ? 'text-primary' : 'text-foreground/60'
								}`}
							>
								{item.label}
							</Link>
						))}
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
				className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-sm transition-transform duration-300 ease-in-out md:hidden ${
					isOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				<div className='container mx-auto px-4 pt-20'>
					<div className='flex flex-col space-y-4'>
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								onClick={() => {
									setIsOpen(false)
									document.body.style.overflow = ''
								}}
								className={`text-lg font-medium transition-colors hover:text-primary ${
									pathname === item.href ? 'text-primary' : 'text-foreground/60'
								}`}
							>
								{item.label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</nav>
	)
}
