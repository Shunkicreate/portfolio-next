'use client'

import LoadingLogo from './LoadingLogo'

interface LoadingLayoutProps {
	onLoadingComplete: () => void
}

export default function LoadingLayout({ onLoadingComplete }: LoadingLayoutProps) {
	return (
		<div className='min-h-screen bg-background'>
			<LoadingLogo onLoadingComplete={onLoadingComplete} />
		</div>
	)
}
