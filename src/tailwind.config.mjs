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
                heading: "'Bebas Neue', 'Oswald', sans-serif",
                paragraph: "'Inter', 'Segoe UI', sans-serif"
            },
            colors: {
                // Bold, masculine, high-contrast palette
                black: '#0a0a0a',
                'charcoal': '#1a1a1a',
                'charcoal-light': '#2d2d2d',
                'clay': '#c85a3a',
                'clay-dark': '#a84a2a',
                'rust': '#d4663a',
                'rust-light': '#e07a4a',
                'gold': '#b8a86a',
                'gold-dark': '#8b7a4a',
                'cream': '#f5f1e8',
                'cream-light': '#faf8f4',
                'olive': '#4a4a3a',
                'olive-dark': '#3a3a2a',
                
                // Semantic colors
                destructive: '#d4663a',
                'destructive-foreground': '#ffffff',
                background: '#0a0a0a',
                secondary: '#c85a3a',
                'secondary-foreground': '#ffffff',
                'primary-foreground': '#f5f1e8',
                primary: '#0a0a0a'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
