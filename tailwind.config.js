/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,vue,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,vue,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,vue,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,vue,mdx}",
    "./plugins/**/*.{js,ts,jsx,tsx,vue,mdx}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
    },
  },
  plugins: [],
}
