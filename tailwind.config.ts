import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: { main: '#F20000', ellipse: '#FD003A' },
        secondary: {
          main: '#202020',
        },
        body: {
          main: '#FFFFFF',
          grey: '#EFEFEF',
        },
        text: {
          main: '#000000',
        },
      },
      fontFamily: {
        // cbody: ['CustomBodyFont', 'sans-serif'],
        // cheading: ['CustomHeadingFont', 'sans-serif'],
        cbody: ['var(--font-body)'],
        cheading: ['var(--font-heading)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
