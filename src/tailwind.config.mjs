/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.25', letterSpacing: '0.025em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.75', letterSpacing: '-0.025em', fontWeight: '400' }],
                xl: ['1.25rem', { lineHeight: '1.75', letterSpacing: '-0.025em', fontWeight: '500' }],
                '2xl': ['1.5rem', { lineHeight: '2', letterSpacing: '-0.025em', fontWeight: '500' }],
                '3xl': ['1.875rem', { lineHeight: '2.25', letterSpacing: '-0.025em', fontWeight: '600' }],
                '4xl': ['2.25rem', { lineHeight: '2.5', letterSpacing: '-0.025em', fontWeight: '600' }],
                '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '700' }],
                '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '700' }],
                '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '700' }],
                '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '700' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '700' }],
            },
            fontFamily: {
                heading: "'Inter', 'Segoe UI', sans-serif",
                paragraph: "'Inter', 'Segoe UI', sans-serif"
            },
            colors: {
                // Organic food e-commerce palette
                'organic-green': '#2d7a3e',
                'organic-green-light': '#4a9d5a',
                'organic-green-lighter': '#e8f3eb',
                'soil-brown': '#8b6f47',
                'soil-brown-light': '#a88a5f',
                'cream': '#f9f7f3',
                'cream-dark': '#f0ede7',
                'dark-gray': '#2c2c2c',
                'light-gray': '#f5f5f5',
                'border-gray': '#e0e0e0',
                
                // Semantic colors
                destructive: '#dc2626',
                'destructive-foreground': '#ffffff',
                background: '#ffffff',
                secondary: '#8b6f47',
                'secondary-foreground': '#ffffff',
                'primary-foreground': '#ffffff',
                primary: '#2d7a3e'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
