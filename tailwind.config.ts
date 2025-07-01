import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: '#e5e7eb', // now you can use border-border
      },
    },
  },
  plugins: [],
}

export default config
