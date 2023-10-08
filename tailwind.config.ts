import type { Config } from 'tailwindcss'
const {nextui} = require("@nextui-org/react");
import { Libre_Baskerville, Open_Sans } from 'next/font/google';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'head' : '#EAF0CE',
        'reseda-green' : '#71816D',
      },
      fontFamily: {
        serif: ['var(--font-librebaskerville)'],
        sans: ['var(--font-opensans)'],
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
export default config
