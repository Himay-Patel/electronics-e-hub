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
        e_hub_black: "#000000",
        e_hub_light_black: "#101012",
        e_hub_gray: "#4d4e4f",
        e_hub_light_gray: "#95999e",
        e_hub_white: "#ffffff",
        e_hub_orange: "#ff7f00",
        e_hub_banner_text: "#c6c6b6",
        e_hub_blue: "#92a2b2",
        e_hub_graywhite: "#f2f2f2",
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100vw)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  variants: {
    extend: {
      transform: ['hover'],
      opacity: ['hover'],
    },
  },
  plugins: [],
};
export default config;
