module.exports = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
		cssnano:
			process.env.NODE_ENV === 'production'
				? {
						preset: [
							'default',
							{
								discardComments: {
									removeAll: true,
								},
								normalizeWhitespace: false,
								cssDeclarationSorter: true,
								reduceIdents: true,
								mergeIdents: true,
								minifyFontValues: true,
								minifyGradients: true,
								minifyParams: true,
								minifySelectors: true,
								zindex: false,
							},
						],
				  }
				: false,
	},
}

