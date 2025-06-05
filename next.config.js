const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
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
	experimental: {
		optimizeCss: true,
		optimizePackageImports: ['@headlessui/react', 'gsap', 'swiper', 'photoswipe'],
		scrollRestoration: true,
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},
	webpack: (config, { dev, isServer }) => {
		if (!dev && !isServer) {
			// CSS optimization
			config.optimization.splitChunks.cacheGroups.styles = {
				name: 'styles',
				test: /\.(css|scss)$/,
				chunks: 'all',
				enforce: true,
				priority: 10,
			}

			// Vendor chunk optimization
			config.optimization.splitChunks.cacheGroups.vendor = {
				name: 'vendor',
				test: /[\\/]node_modules[\\/]/,
				chunks: 'all',
				priority: 20,
			}

			// Three.js specific optimization
			config.optimization.splitChunks.cacheGroups.three = {
				name: 'three',
				test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
				chunks: 'all',
				priority: 30,
			}
		}

		return config
	},
}

module.exports = withBundleAnalyzer(nextConfig)

