/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    DEFAULT: '#1c3877',
                    dark: '#122560',
                    deep: '#0b1a42',
                },
                red: {
                    DEFAULT: '#e23639',
                    dark: '#b82c2e',
                },
                gold: {
                    DEFAULT: '#c9a84c',
                    light: '#f0e0a8',
                },
            },
            fontFamily: {
                playfair: ['Playfair Display', 'serif'],
                sans: ['DM Sans', 'sans-serif'],
            },
        },
    },
    plugins: [],
}