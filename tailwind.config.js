/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    extend: {
      colors: {
        main: '#FFE600',
        border: '#BFBEC5',
        contentText: '#555555',
        hiddenText: '#0000004d',
        bgColor: '#F8F8F8',
        buttonOnClick: '#E8D000',
      },
      zIndex: {
        '-10': '-10',
      }
    },
  },
  plugins: [
    // require('@tailwindcss/line-clamp'),
  ],
}