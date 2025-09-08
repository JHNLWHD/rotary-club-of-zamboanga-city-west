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
        manualChunks: {
          chakra: ['@chakra-ui/react', '@emotion/react'],
          contentful: ['contentful', '@contentful/rich-text-html-renderer'],
          utils: ['lucide-react', 'keen-slider', 'slugify'],
          icons: ['react-icons'],
          pdf: ['pdfjs-dist', 'react-pdf'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: [
      '@chakra-ui/react', 
      '@emotion/react',
      'contentful',
      'lucide-react',
      'keen-slider/react'
    ],
  },
});
