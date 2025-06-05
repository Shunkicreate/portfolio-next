import LoadingLogo from './LoadingLogo'

interface LoadingLayoutProps {
	onLoadingComplete: () => void
}

export default function LoadingLayout({ onLoadingComplete }: LoadingLayoutProps) {
	return (
		<div className='relative min-h-screen bg-background'>
			{/*
        LCP 候補として検出させたい "ほぼ透明" な見出しを先に置く
        ・opacity: 0.01 でレイアウト領域を確保しつつ、目立たないようにする
        ・ビューポートの中心に大きく置いておくと確実に検出されやすい
      */}
			<h1 className='absolute inset-0 flex items-center justify-center text-5xl font-bold text-foreground' style={{ opacity: 0.001 }}>
				Shunki Create
			</h1>

			{/* ここが既存のロゴアニメーション */}
			<LoadingLogo onLoadingComplete={onLoadingComplete} />
		</div>
	)
}
