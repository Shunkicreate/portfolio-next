const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: false,
	},
	images: {
		domains: [
			'web-mario-shunkicreate.vercel.app',
			'firebasestorage.googleapis.com',
			'banmeshikun.com',
			'water-canvas.netlify.app',
			'with-ai.netlify.app',
			'busdes-kic.vercel.app',
			'www.okayama-shikata-tandf.com',
			'web-maracas.vercel.app',
			'voice-pococha.com',
			'topolly-prod.global.ssl.fastly.net',
		],
	},
	webpack: (config) => {
		// バンドルの最適化
		config.optimization.splitChunks.cacheGroups = {
			...config.optimization.splitChunks.cacheGroups,
			three: {
				test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
				name: 'three-vendor',
				chunks: 'all',
				priority: 10,
			},
			react: {
				test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
				name: 'react-vendor',
				chunks: 'all',
				priority: 20,
			},
		}

		return config
	},
}

module.exports = withBundleAnalyzer(nextConfig)

