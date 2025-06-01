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
}

module.exports = withBundleAnalyzer(nextConfig)
