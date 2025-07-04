import { defineConfig, createSystem, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#e3f0fa" },
          100: { value: "#b3d3f1" },
          200: { value: "#80b5e7" },
          300: { value: "#4d97dd" },
          400: { value: "#267fd5" },
          500: { value: "#005DAA" }, // Rotary Royal Blue
          600: { value: "#004b8a" },
          700: { value: "#00396a" },
          800: { value: "#00274a" },
          900: { value: "#00152a" },
        },
        gold: {
          50: { value: "#fff8e1" },
          100: { value: "#ffecb3" },
          200: { value: "#ffe082" },
          300: { value: "#ffd54f" },
          400: { value: "#ffca28" },
          500: { value: "#FDB714" }, // Rotary Gold
          600: { value: "#fbc02d" },
          700: { value: "#f9a825" },
          800: { value: "#f57c00" },
          900: { value: "#e65100" },
        },
        gray: {
          50: { value: "#F8F9FA" }, // light gray
          200: { value: "#e9ecef" },
          400: { value: "#dee2e6" },
          600: { value: "#adb5bd" },
          700: { value: "#6C757D" }, // medium gray
          900: { value: "#343A40" }, // dark gray
        },
        white: { value: "#FFFFFF" },
      },
      fonts: {
        heading: { value: "'Montserrat', 'Inter', Arial, sans-serif" },
        body: { value: "'Open Sans', 'Inter', Arial, sans-serif" },
      },
      radii: {
        sm: { value: "8px" },
        md: { value: "10px" },
        lg: { value: "12px" },
      },
      fontSizes: {
        xs: { value: "0.75rem" },
        sm: { value: "0.875rem" },
        md: { value: "1rem" },
        lg: { value: "1.125rem" },
        xl: { value: "1.25rem" },
        "2xl": { value: "1.5rem" },
        "3xl": { value: "1.875rem" },
        "4xl": { value: "2.25rem" },
        "5xl": { value: "3rem" },
        "6xl": { value: "3.75rem" },
        "7xl": { value: "4.5rem" },
        "8xl": { value: "6rem" },
        "9xl": { value: "8rem" },
      },
    },
  },
});

const system = createSystem(defaultConfig, config);

export default system; 