/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        display: ['Geist', 'Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
        sans: ['Geist', 'Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#5e6ad2",
          foreground: "#ffffff",
          hover: "#828fff",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Linear tokens
        canvas: "#010102",
        surface: {
          1: "#0f1011",
          2: "#141516",
          3: "#18191a",
        },
        ink: {
          DEFAULT: "#f7f8f8",
          muted: "#d0d6e0",
          subtle: "#8a8f98",
          tertiary: "#62666d",
        },
        hairline: "#23252a",
        linear: {
          DEFAULT: "#5e6ad2",
          hover: "#828fff",
          focus: "#5e69d1",
        },
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "6px",
        xl: "16px",
        pill: "9999px",
      },
      boxShadow: {
        'soft': '0 0 0 1px #23252a',
        'lift': '0 8px 30px -8px rgba(94,106,210,0.3)',
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--reka-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--reka-accordion-content-height)" }, to: { height: "0" } },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
