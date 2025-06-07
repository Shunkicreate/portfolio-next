import LoadingLogo from './LoadingLogo'

interface LoadingLayoutProps {
	onLoadingComplete: () => void
}

// クリティカルCSSをインライン化
const criticalStyles = {
	container: {
		position: 'relative' as const,
		minHeight: '100vh',
		margin: 0,
		padding: 0,
	},
	heading: {
		position: 'absolute' as const,
		inset: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: '3rem',
		fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
		fontWeight: 'bold',
		opacity: 0.001,
		margin: 0,
		padding: 0,
	},
}

export default function LoadingLayout({ onLoadingComplete }: LoadingLayoutProps) {
	return (
		<div style={criticalStyles.container}>
			<h1 style={criticalStyles.heading}>Shunki Create</h1>
			<LoadingLogo onLoadingComplete={onLoadingComplete} />
		</div>
	)
}
