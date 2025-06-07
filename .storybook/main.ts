// .storybook/main.ts
import type { StorybookConfig } from '@storybook/nextjs-vite'
  import { mergeConfig } from 'vite'
  import react from '@vitejs/plugin-react'

const config: StorybookConfig = {
	stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-onboarding',
		'@chromatic-com/storybook',
		'@storybook/addon-docs',
		'@storybook/addon-a11y',
		'@storybook/addon-vitest',
	],
	framework: {
		name: '@storybook/nextjs-vite',
		options: {},
	},
	staticDirs: ['../public'],

	// ここから追加 ↓
	async viteFinal(viteConfig) {
		return mergeConfig(viteConfig, {
			plugins: [
				react({
					babel: {
						plugins: ['styled-jsx/babel'],
					},
				}),
			],
			optimizeDeps: {
				include: ['styled-jsx'],
			},
		})
	},
	// ここまで追加 ↑
}

export default config

