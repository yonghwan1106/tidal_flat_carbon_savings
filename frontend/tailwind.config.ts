import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#16a34a', // 녹색 - 환경
        secondary: '#0284c7', // 청색 - 갯벌/바다
        accent: '#f59e0b', // 주황 - 포인트/이자
      },
    },
  },
  plugins: [],
}

export default config
