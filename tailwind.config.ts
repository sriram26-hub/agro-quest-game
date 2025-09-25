import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        // Agricultural Theme Colors
        soil: {
          DEFAULT: "hsl(var(--soil))",
          foreground: "hsl(var(--soil-foreground))",
        },
        water: {
          DEFAULT: "hsl(var(--water))",
          foreground: "hsl(var(--water-foreground))",
        },
        crop: {
          DEFAULT: "hsl(var(--crop))",
          foreground: "hsl(var(--crop-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        'gradient-soil': 'var(--gradient-soil)',
        'gradient-sky': 'var(--gradient-sky)',
        'gradient-field': 'var(--gradient-field)',
        'gradient-harvest': 'var(--gradient-harvest)',
      },
      boxShadow: {
        'earth': 'var(--shadow-earth)',
        'crop': 'var(--shadow-crop)',
        'tool': 'var(--shadow-tool)',
      },
      transitionTimingFunction: {
        'farm': 'var(--transition-farm)',
        'bounce-crop': 'var(--bounce-crop)',
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "grow-crop": {
          "0%": {
            transform: "scale(0.8) translateY(10px)",
            opacity: "0",
          },
          "50%": {
            transform: "scale(1.1) translateY(-5px)",
          },
          "100%": {
            transform: "scale(1) translateY(0)",
            opacity: "1",
          },
        },
        "water-drop": {
          "0%": {
            transform: "translateY(-20px) scale(0)",
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            transform: "translateY(0) scale(1)",
            opacity: "0",
          },
        },
        "tool-bounce": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "grow-crop": "grow-crop 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "water-drop": "water-drop 1s ease-in-out infinite",
        "tool-bounce": "tool-bounce 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
