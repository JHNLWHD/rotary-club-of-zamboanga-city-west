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
          vendor: ['react', 'react-dom'],
          chakra: ['@chakra-ui/react', '@emotion/react'],
          contentful: ['contentful', '@contentful/rich-text-html-renderer'],
          utils: ['lucide-react', 'keen-slider', 'slugify'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      '@chakra-ui/react', 
      '@emotion/react',
      'contentful',
      'lucide-react',
      'keen-slider/react'
    ],
  },
});
