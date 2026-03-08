/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
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
        // Custom colors for AI Ledger Bot
        lime: {
          DEFAULT: "#9ACD32",
          dark: "#7CB342",
          light: "#A8DADC",
        },
        dark: {
          DEFAULT: "#0B0B0D",
          light: "#141419",
          lighter: "#1E1E26",
        },
        gray: {
          primary: "#F5F5F7",
          secondary: "#A1A1AA",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        '2xl': '22px',
        '3xl': '44px',
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        phone: "0 28px 80px rgba(0,0,0,0.55)",
        bubble: "0 10px 30px rgba(0,0,0,0.35)",
        glow: "0 0 0 2px #B6FF2E, 0 0 40px rgba(182,255,46,0.22)",
        'glow-sm': "0 0 20px rgba(182,255,46,0.15)",
      },
      fontFamily: {
        display: ['Space Grotesk', 'Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "float-x": {
          "0%, 100%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(6px)" },
        },
        "pulse-glow": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.55" },
          "50%": { transform: "scale(1.03)", opacity: "0.65" },
        },
        "typing": {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        "blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "float": "float 3.6s ease-in-out infinite",
        "float-x": "float-x 4.2s ease-in-out infinite alternate",
        "pulse-glow": "pulse-glow 5s ease-in-out infinite",
        "typing": "typing 1.5s steps(20) forwards",
        "blink": "blink 0.8s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
