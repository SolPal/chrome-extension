/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
        './src/***/**/*.{ts,tsx}'
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'hsl(220 13% 91%)',
                input: 'hsl(220 13% 91%)',
                ring: 'hsl(262.1 83.3% 57.8%)',
                background: 'hsl(0 0% 100%)',
                foreground: 'hsl(224 71.4% 4.1%)',
                primary: {
                    DEFAULT: 'hsl(265,34%,41%)',
                    foreground: 'hsl(210 20% 98%)'
                },
                secondary: {
                    DEFAULT: 'hsl(220 14.3% 95.9%)',
                    foreground: 'hsl(220.9 39.3% 11%)'
                },
                destructive: {
                    DEFAULT: 'hsl(0 84.2% 60.2%)',
                    foreground: 'hsl( 210 20% 98%)'
                },
                muted: {
                    DEFAULT: 'hsl(220 14.3% 95.9%)',
                    foreground: 'hsl(220 8.9% 46.1%)'
                },
                accent: {
                    DEFAULT: 'hsl(220 14.3% 95.9%)',
                    foreground: 'hsl(220.9 39.3% 11%))'
                },
                popover: {
                    DEFAULT: 'hsl(0 0% 100%)',
                    foreground: 'hsl(224 71.4% 4.1%)'
                },
                card: {
                    DEFAULT: 'hsl(0 0% 100%)',
                    foreground: 'hsl(224 71.4% 4.1%)'
                }
            },
            borderRadius: {
                lg: '0.5rem',
                md: 'calc(0.5rem - 2px)',
                sm: 'calc(0.5rem - 4px)'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            }
        }
    },
    plugins: [require('tailwindcss-animate')]
}
