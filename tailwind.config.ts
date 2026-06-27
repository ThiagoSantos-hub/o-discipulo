import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: "#0F0F0F",
        foreground: "#FFFFFF",
        primary: { DEFAULT: "#C9A962", foreground: "#0F0F0F" },
        secondary: { DEFAULT: "#1C1C1C", foreground: "#FFFFFF" },
        accent: { DEFAULT: "#C9A962", foreground: "#0F0F0F" },
        card: { DEFAULT: "#1C1C1C", foreground: "#FFFFFF" },
        muted: { DEFAULT: "#2A2A2A", foreground: "#A1A1AA" },
        border: "#333333",
      },
      borderRadius: { lg: "0.75rem", md: "calc(0.75rem - 2px)", sm: "calc(0.75rem - 4px)" },
    },
  },
  plugins: [],
} satisfies Config

export default config