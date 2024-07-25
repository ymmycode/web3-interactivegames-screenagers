/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        'primary-1': '#E3E935',
      },
      screens: {
        'big-screen': '1441px',
        tablet: { raw: '(orientation: portrait) and (min-width: 740px) and (max-width: 1440px)' },
        tabletls: { raw: '(orientation: landscape) and (min-width: 600px) and (max-width: 1279px)' },
        tablets: { raw: '(min-width: 600px) and (max-width: 1023px)' },
        tabletsls: { raw: '(orientation: landscape) and (min-width: 600px) and (max-width: 1023px)' },
      },
      fontSize: {
        '4xs': '0.525rem', // 8.4px
        '3xs': '0.625rem', // 10px
        xxs: '0.75rem', // 12px
      },
    },
  },
  plugins: [
    '@tailwindcss/container-queries',
    require('@tailwindcss/typography'),
  ],
}