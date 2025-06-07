import type { Preview } from '@storybook/react'
import '../styles/tailwind.css'
import { themes } from '@storybook/theming'

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		darkMode: {
			current: 'light',
			dark: { ...themes.dark },
			light: { ...themes.light },
			stylePreview: true,
		},
	},
}

export default preview

