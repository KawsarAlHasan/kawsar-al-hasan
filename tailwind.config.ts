import type { Config } from "tailwindcss";

const config: Config = {
  // Enable class-based dark mode (controlled by next-themes)
  darkMode: ["class"],

  // Scan all component/page files for class names
content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./data/**/*.{js,ts,jsx,tsx,mdx}",
  "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  "./types/**/*.{js,ts,jsx,tsx,mdx}",
],

  theme: {
    extend: {
      // ─── Font Families ─────────────────────────────────────
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },

      // ─── Custom Colors ──────────────────────────────────────
      colors: {
        // Background scale
        background: {
          DEFAULT: "hsl(var(--background))",
          surface: "hsl(var(--surface))",
          raised: "hsl(var(--surface-raised))",
        },
        // Text scale
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          secondary: "hsl(var(--text-secondary))",
          muted: "hsl(var(--text-muted))",
        },
        // Border scale
        border: {
          DEFAULT: "hsl(var(--border))",
          strong: "hsl(var(--border-strong))",
        },
        // Accent
        accent: {
          DEFAULT: "hsl(var(--accent))",
          secondary: "hsl(var(--accent-secondary))",
        },
      },

      // ─── Border Radius ──────────────────────────────────────
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "20px",
        "3xl": "28px",
      },

      // ─── Box Shadows ────────────────────────────────────────
      boxShadow: {
        "glow-sm": "0 0 20px rgba(99, 102, 241, 0.1)",
        "glow-md": "0 0 40px rgba(99, 102, 241, 0.15)",
        "glow-lg": "0 0 80px rgba(99, 102, 241, 0.2)",
        "glow-xl": "0 0 120px rgba(99, 102, 241, 0.25)",
        "card-sm": "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
        "card-md": "0 4px 16px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)",
        "card-lg": "0 12px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)",
        "dark-sm": "0 1px 3px rgba(0,0,0,0.4)",
        "dark-md": "0 4px 16px rgba(0,0,0,0.5)",
        "dark-lg": "0 12px 40px rgba(0,0,0,0.6)",
      },

      // ─── Backdrop Blur ──────────────────────────────────────
      backdropBlur: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "40px",
      },

      // ─── Custom Animations ──────────────────────────────────
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(99, 102, 241, 0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(99, 102, 241, 0.3)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        ping: {
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        float: "float 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "fade-up": "fade-up 0.5s ease-out forwards",
      },

      // ─── Spacing Extras ─────────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "100": "25rem",
        "112": "28rem",
        "128": "32rem",
      },

      // ─── Z-Index Scale ──────────────────────────────────────
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },

      // ─── Transition Timing ──────────────────────────────────
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "quart-out": "cubic-bezier(0.25, 1, 0.5, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },

  plugins: [
    // Add tailwindcss-animate for shadcn/ui component animations
    // Run: npm install tailwindcss-animate
    // require("tailwindcss-animate"),
  ],
};

export default config;
