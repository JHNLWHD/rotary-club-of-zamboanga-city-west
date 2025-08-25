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
          50: { value: "#fef7e8" },
          100: { value: "#fdecc8" },
          200: { value: "#fcdba4" },
          300: { value: "#fbca7f" },
          400: { value: "#f9b85a" },
          500: { value: "#f7a81b" }, // Official Rotary Gold
          600: { value: "#e6971a" },
          700: { value: "#d58618" },
          800: { value: "#c47516" },
          900: { value: "#b36414" },
        },
        cranberry: {
          50: { value: "#fdf2f7" },
          100: { value: "#fce7f0" },
          200: { value: "#f9c2d4" },
          300: { value: "#f59cb8" },
          400: { value: "#f177a0" },
          500: { value: "#d41367" }, // Primary Cranberry
          600: { value: "#b8105a" },
          700: { value: "#9c0e4d" },
          800: { value: "#800c40" },
          900: { value: "#640936" },
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