import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import netlifyPlugin from "@netlify/vite-plugin-react-router";

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [reactRouter(), tsconfigPaths(), netlifyPlugin()],
  ssr: {
    external: ["posthog-js", "posthog-js/react"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Group Chakra UI and Emotion together
          if (id.includes('@chakra-ui') || id.includes('@emotion')) {
            return 'chakra';
          }
          // Group Contentful related packages
          if (id.includes('contentful')) {
            return 'contentful';
          }
          // Group utility libraries
          if (id.includes('lucide-react') || id.includes('keen-slider') || id.includes('slugify')) {
            return 'utils';
          }
          // Group PDF related packages
          if (id.includes('pdfjs-dist') || id.includes('react-pdf')) {
            return 'pdf';
          }
          // Let other packages be handled automatically
          return null;
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
