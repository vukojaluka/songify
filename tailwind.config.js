/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate'
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            transitionProperty: {
                fill: 'fill',
            },
            fontFamily: {
                montserrat: ['Montserrat', 'sans-serif'],
            },
            maxWidth: {
                1200: '75rem',
            },
            boxShadow: {
                button: '0px 20px 50px 0px rgba(0, 0, 0, 0.04)',
                input: '0px 10px 10px 0px hsla(174, 46%, 16%, 0.05)',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            colors: {
                'border-button-color': 'hsl(var(--border-button-color))',
                'action-button': 'hsl(var(--action-button))',
                'progress-bar': 'hsl(var(--progress-bar))',
                'switch-thumb-background': 'hsl(var(--switch-thumb-background))',
                placeholder: 'hsl(var(--placeholder))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                'sidebar-background': 'hsl(var(--sidebar-background))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    1: 'hsl(var(--chart-1))',
                    2: 'hsl(var(--chart-2))',
                    3: 'hsl(var(--chart-3))',
                    4: 'hsl(var(--chart-4))',
                    5: 'hsl(var(--chart-5))',
                },
            },
        },
    },
    plugins: [tailwindcssAnimate],
}
