import { defineConfig, createSystem, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#eef3f9" },
          100: { value: "#d6e1ef" },
          200: { value: "#adc4de" },
          300: { value: "#84a7ce" },
          400: { value: "#527eb1" },
          500: { value: "#17458f" }, // Official Rotary Royal Blue
          600: { value: "#143f80" },
          700: { value: "#10366d" },
          800: { value: "#0c2b59" },
          900: { value: "#082247" },
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
        interact: {
          50: { value: "#eff6ff" },
          100: { value: "#dbeafe" },
          200: { value: "#bfdbfe" },
          300: { value: "#93c5fd" },
          400: { value: "#60a5fa" },
          500: { value: "#3b82f6" }, // Primary Light Blue
          600: { value: "#2563eb" },
          700: { value: "#1d4ed8" },
          800: { value: "#1e40af" },
          900: { value: "#1e3a8a" },
        },
        gray: {
          50: { value: "#F8F9FA" }, // light gray
          200: { value: "#e9ecef" },
          400: { value: "#dee2e6" },
          600: { value: "#596575" },
          700: { value: "#465361" },
          900: { value: "#343A40" }, // dark gray
        },
        white: { value: "#FFFFFF" },
      },
      fonts: {
        heading: { value: "'Open Sans', Arial, sans-serif" },
        body: { value: "'Open Sans', Arial, sans-serif" },
      },
      radii: {
        sm: { value: "0px" },
        md: { value: "0px" },
        lg: { value: "0px" },
        xl: { value: "0px" },
        "2xl": { value: "0px" },
        full: { value: "0px" },
      },
      shadows: {
        sm: { value: "none" },
        md: { value: "none" },
        lg: { value: "none" },
        xl: { value: "none" },
        "2xl": { value: "none" },
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
