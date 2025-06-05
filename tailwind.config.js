import flowbite from "flowbite-react/tailwind";
import flowbitePlugin from "flowbite/plugin";
import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern:
        /-fluid-(2xs|xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|10xl)/,
    },
    "myNav-links",
  ],
  theme: {
    extend: {
      animation: {
        fadeInBottom: "fadeInBottom 0.5s ease-in-out",
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
      transitionProperty: {
        transform: "transform",
      },

      screens: {
        "2xs": "320px",
        xs: "481px",
        sm: "640px",
        md: "769px",
        lg: "1025px",
        xl: "1281px",
        "2xl": "1537px",
      },
      spacing: {
        "fluid-2xs": "clamp(0.25rem, 0.2rem + 0.3vw, 0.5rem)",
        "fluid-xs": "clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)",
        "fluid-sm": "clamp(0.75rem, 0.6rem + 0.8vw, 1.25rem)",
        "fluid-md": "clamp(1rem, 0.8rem + 1.2vw, 2rem)",
        "fluid-lg": "clamp(1.5rem, 1.2rem + 1.8vw, 3rem)",
        "fluid-xl": "clamp(2rem, 1.5rem + 3vw, 5rem)",
        "fluid-2xl": "clamp(3rem, 2rem + 4vw, 7rem)",
        "fluid-3xl": "clamp(4rem, 2.5rem + 5vw, 9rem)",
        "fluid-4xl": "clamp(5rem, 3rem + 6vw, 11rem)",
        "fluid-5xl": "clamp(6rem, 3.5rem + 7vw, 13rem)",
        "fluid-6xl": "clamp(7rem, 4rem + 8vw, 15rem)",
        "fluid-7xl": "clamp(8rem, 4.5rem + 9vw, 17rem)",
        "fluid-8xl": "clamp(9rem, 5rem + 10vw, 17rem)",
        "fluid-9xl": "clamp(10rem, 5.5rem + 11vw, 19rem)",
        "fluid-10xl": "clamp(11rem, 6rem + 12vw, 21rem)",
      },
      inset: {
        "fluid-2xs": "clamp(0.125rem, 0.1rem + 0.2vw, 0.25rem)",
        "fluid-xs": "clamp(0.25rem, 0.2rem + 0.3vw, 0.5rem)",
        "fluid-sm": "clamp(0.5rem, 0.4rem + 0.6vw, 1rem)",
        "fluid-md": "clamp(1rem, 0.8rem + 1vw, 2rem)",
        "fluid-lg": "clamp(1.5rem, 1.2rem + 1.5vw, 3rem)",
        "fluid-xl": "clamp(2rem, 1.6rem + 2vw, 4rem)",
        "fluid-2xl": "clamp(3rem, 2.4rem + 3vw, 6rem)",
      },
      width: {
        "fluid-xs": "clamp(1rem, 0.8rem + 1vw, 2rem)",
        "fluid-sm": "clamp(2rem, 1.6rem + 2vw, 4rem)",
        "fluid-md": "clamp(4rem, 3rem + 4vw, 8rem)",
        "fluid-lg": "clamp(8rem, 6rem + 8vw, 16rem)",
        "fluid-xl": "clamp(12rem, 8rem + 12vw, 24rem)",
        "fluid-2xl": "clamp(16rem, 12rem + 16vw, 32rem)",
        "fluid-3xl": "clamp(20rem, 16rem + 20vw, 40rem)",
        "fluid-4xl": "clamp(24rem, 18rem + 25vw, 48rem)",
        "fluid-5xl": "clamp(32rem, 24rem + 30vw, 64rem)",
      },
      height: {
        "fluid-xs": "clamp(1rem, 0.8rem + 1vw, 2rem)",
        "fluid-sm": "clamp(2rem, 1.2rem + 1.7vw, 4rem)",
        "fluid-md": "clamp(4rem, 2rem + 3vw, 8rem)",
        "fluid-lg": "clamp(8rem, 6rem + 8vw, 16rem)",
        "fluid-xl": "clamp(12rem, 8rem + 12vw, 24rem)",
        "fluid-2xl": "clamp(16rem, 12rem + 16vw, 32rem)",
        "fluid-3xl": "clamp(20rem, 16rem + 20vw, 40rem)",
        "fluid-4xl": "clamp(24rem, 18rem + 25vw, 48rem)",
        "fluid-5xl": "clamp(32rem, 24rem + 30vw, 64rem)",
      },
      fontSize: {
        "fluid-2xs": "clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem)",
        "fluid-xs": "clamp(0.875rem, 0.8rem + 0.3vw, 1rem)",
        "fluid-sm": "clamp(0.5rem, 0.9rem + 0.4vw, 3rem)",
        "fluid-base": "clamp(1.125rem, 1rem + 0.5vw, 1.5rem)",
        "fluid-lg": "clamp(1.25rem, 1.1rem + 0.7vw, 1.75rem)",
        "fluid-xl": "clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem)",
        "fluid-2xl": "clamp(1.75rem, 1.4rem + 1.8vw, 3rem)",
        "fluid-3xl": "clamp(2rem, 1.6rem + 2.4vw, 4rem)",
        "fluid-4xl": "clamp(2.25rem, 1.8rem + 2.8vw, 5rem)",
      },
      size: {
        "fluid-2xs": "clamp(0.75rem, 0.9vw, 0.875rem)",
        "fluid-xs": "clamp(0.875rem, 1vw, 1rem)",
        "fluid-sm": "clamp(1rem, 1.2vw, 1.25rem)",
        "fluid-base": "clamp(1.125rem, 1.5vw, 1.5rem)",
        "fluid-lg": "clamp(1.25rem, 2vw, 1.75rem)",
        "fluid-xl": "clamp(1.5rem, 3vw, 2.25rem)",
        "fluid-2xl": "clamp(2rem, 4vw, 3rem)",
        "fluid-3xl": "clamp(2.5rem, 5vw, 4rem)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        testColor: "#ff0000",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [flowbitePlugin, tailwindcssAnimate],
};

export default config;
