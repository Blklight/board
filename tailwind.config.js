const { fontFamily, defaultTheme } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // experimental: {
  //   optimizeUniversalDefaults: true,
  // },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{md,mdx}",
    "./assets/svg/**/*.svg",
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "0 1rem",
    },
    extend: {
      spacing: {
        "9/16": "56.25%",
      },
      lineHeight: {
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
        serif: ["var(--font-serif)", ...fontFamily.serif],
      },
      maxWidth: {
        "8xl": "1320px",
      },
      colors: {
        transparent: "transparent",
        light: {
          100: "#fbfbfb",
          200: "#f7f7f7",
          300: "#f2f2f2",
          400: "#eeeeee",
          500: "#eaeaea",
          600: "#bbbbbb",
          700: "#8c8c8c",
          800: "#5e5e5e",
          900: "#2f2f2f",
        },
        dark: {
          100: "#d0d0d0",
          200: "#a0a0a0",
          300: "#717171",
          400: "#414141 ",
          500: "#121212",
          600: "#0e0e0e",
          700: "#0b0b0b",
          800: "#070707",
          900: "#040404",
        },
        uv: {
          100: "#daceff",
          200: "#b69dff",
          300: "#916dff",
          400: "#6d3cff",
          500: "#480bff",
          600: "#3a09cc",
          700: "#2b0799",
          800: "#1d0466",
          900: "#0e0233",
        },
        polen: {
          100: "#fffdf8",
          200: "#fffbf1 ",
          300: "#fffaeb ",
          400: "#fff8e4",
          500: "#fff6dd",
          600: "#ccc5b1",
          700: "#999485",
          800: "#666258",
          900: "#33312c",
        },
        crimson: {
          100: "#fbd2d6",
          200: "#f7a5ad",
          300: "#f37884",
          400: "#ef4b5b",
          500: "#eb1e32",
          600: "#bc1828",
          700: "#8d121e",
          800: "#5e0c14",
          900: "#2f060a ",
        },
        "neon-yellow": {
          100: "#ffffcc",
          200: "#ffff99",
          300: "#ffff66",
          400: "#ffff33",
          500: "#ffff00",
          600: "#cccc00 ",
          700: "#999900",
          800: "#666600",
          900: "#333300 ",
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: "100%",
            color: theme("colors.dark.500"),
            lineHeight: "1.5",
            a: {
              color: theme("colors.blue.500"),
              "&:hover": {
                color: `${theme("colors.blue.700")} !important`,
              },
              code: { color: theme("colors.blue.400") },
            },
            p: {
              // fontSize: "20px",
              // letterSpacing: "0.01em",
              marginTop: "0",
              marginBottom: "1.5rem",
            },
            h1: {
              fontSize: "2.5rem",
              fontWeight: "700",
              letterSpacing: "0.03em",
              lineHeight: "1.5",
              color: theme("colors.dark.500"),
              marginTop: "0",
              marginBottom: "1.25rem",
            },
            h2: {
              fontSize: "2rem",
              fontWeight: "700",
              letterSpacing: "0.03em",
              color: theme("colors.dark.500"),
              margin: "0 0 1.25rem",
            },
            h3: {
              fontSize: "1.75rem",
              fontWeight: "700",
              letterSpacing: "0.03em",
              color: theme("colors.dark.500"),
              margin: "0 0 1.25rem",
            },
            h4: {
              fontSize: "1.5rem",
              fontWeight: "700",
              color: theme("colors.dark.500"),
              letterSpacing: "0.03em",
              margin: "0 0 1.25rem",
            },
            h5: {
              fontSize: "1.25rem",
              fontWeight: "700",
              color: theme("colors.dark.500"),
              letterSpacing: "0.03em",
              margin: "0 0 1.25rem",
            },
            h6: {
              fontSize: "1rem",
              fontWeight: "700",
              color: theme("colors.dark.500"),
              letterSpacing: "0.03em",
              margin: "0 0 1.25rem",
            },
            pre: {
              backgroundColor: theme("colors.dark.500"),
              whiteSpace: "pre-wrap",
              marginTop: "0.5rem",
              marginBottom: "1.25rem",
            },
            code: {
              color: theme("colors.blue.600"),
              backgroundColor: theme("colors.transparent"),
              paddingLeft: "0",
              paddingRight: "0",
              paddingTop: "0",
              paddingBottom: "0",
              borderRadius: "0",
              wordBreak: "break-all",
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
            details: {
              backgroundColor: theme("colors.gray.100"),
              paddingLeft: "4px",
              paddingRight: "4px",
              paddingTop: "2px",
              paddingBottom: "2px",
              borderRadius: "0.25rem",
            },
            hr: { borderColor: theme("colors.gray.200") },
            ol: {
              marginTop: "0",
            },
            ul: {
              marginTop: "0",
            },
            li: {
              marginTop: "0",
            },
            "ol li::marker": {
              fontWeight: "600",
              color: theme("colors.dark.500"),
            },
            "ul li::marker": {
              color: theme("colors.dark.500"),
            },
            strong: { fontWeight: "700", color: theme("colors.dark.500") },
            blockquote: {
              color: theme("colors.dark.500"),
              borderLeftColor: theme("colors.uv.500"),
              borderLeftWidth: "8px",
              borderBottomWidth: "1px",
              borderBottomColor: theme("colors.uv.500"),
              padding: "0.5rem 1.25rem",
              margin: "0.5rem 0 1.5rem",
              fontStyle: "normal",
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.light.500"),
            a: {
              color: theme("colors.cyan.500"),
              "&:hover": {
                color: `${theme("colors.cyan.400")} !important`,
              },
              code: { color: theme("colors.cyan.400") },
            },
            h1: {
              fontWeight: "700",
              letterSpacing: "0.03em",
              color: theme("colors.light.500"),
            },
            h2: {
              fontWeight: "700",
              letterSpacing: "0.03em",
              color: theme("colors.light.500"),
            },
            h3: {
              fontWeight: "700",
              color: theme("colors.light.500"),
            },
            "h4,h5,h6": {
              color: theme("colors.light.500"),
            },
            pre: {
              backgroundColor: theme("colors.dark.500"),
            },
            code: {
              color: theme("colors.fuchsia.400"),
              backgroundColor: theme("colors.transparent"),
            },
            details: {
              backgroundColor: theme("colors.gray.800"),
            },
            hr: { borderColor: theme("colors.gray.700") },
            "ol li::marker": {
              fontWeight: "600",
              color: theme("colors.light.500"),
            },
            "ul li::marker": {
              color: theme("colors.light.500"),
            },
            strong: { color: theme("colors.gray.100") },
            thead: {
              th: {
                color: theme("colors.gray.100"),
              },
            },
            tbody: {
              tr: {
                borderBottomColor: theme("colors.gray.700"),
              },
            },
            blockquote: {
              color: theme("colors.light.500"),
              borderLeftColor: theme("colors.neon-yellow.500"),
              borderLeftWidth: "8px",
              borderBottomWidth: "1px",
              borderBottomColor: theme("colors.neon-yellow.500"),
              padding: "0.5rem 1.25rem",
              margin: "0.5rem 0 1.5rem",
            },
          },
        },
      }),
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
