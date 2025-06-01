/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			fontFamily: {
				serif: ['"Noto Serif JP"', 'serif'],
				oldmin: ['"Zen Old Mincho"', 'serif'],
				sans: ['Inter', 'sans-serif'],
			},
			colors: {
				base: '#FAF8F6',
				content: '#1A1A1A',
				accent: '#0080FF',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				draw: {
					to: { strokeDashoffset: 0 },
				},
				hoverShake: {
					'0%': { transform: 'scale(1) translateX(0) translateY(0)' },
					'10%': { transform: 'scale(1.05) translateX(0) translateY(-1rem)' },
					'30%': { transform: 'scale(1.05) translateX(-5px) translateY(-1rem)' },
					'50%': { transform: 'scale(1.05) translateX(5px) translateY(-1rem)' },
					'70%': { transform: 'scale(1.05) translateX(-5px) translateY(-1rem)' },
					'90%': { transform: 'scale(1.025) translateX(0) translateY(-1rem)' },
					'100%': { transform: 'scale(1) translateX(0) translateY(0)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				draw: 'draw 1s ease forwards',
				hoverShake: 'hoverShake 0.8s ease-in-out forwards',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}

