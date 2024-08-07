import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Blue
        secondary: '#EF4444', // Red
        background: '#111827', // Dark grey (almost black)
        text: '#F9FAFB', // Light grey/silver
        success: '#10B981', // Green (unchanged)
        warning: '#F59E0B', // Yellow (unchanged)
        error: '#EF4444', // Red (unchanged)
        link: '#3B82F6', // Blue (unchanged)
        border: '#4B5563', // Darker grey (unchanged)
        silver: '#D1D5DB', // Silver
        darkGrey: '#1a2330', // Dark grey for more variety
      },
      width: {
        'cover-small': '150px',
        'cover-large': '300px',
      },
      height: {
        'cover-small': '200px',
        'cover-large': '400px',
      },
    },
  },
  plugins: [],
};

export default config;

