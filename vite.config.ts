import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import netlifyPlugin from "@netlify/vite-plugin-react-router";

export default defineConfig({
  define: {
    'import.meta.env.VITE_SERVICE_PROJECT_DRAFT_PREVIEW': JSON.stringify(
      process.env.CONTEXT === 'branch-deploy' && process.env.BRANCH === 'develop' ? 'true' : 'false',
    ),
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [reactRouter(), tsconfigPaths(), netlifyPlugin()],
  ssr: {
    external: ["posthog-js", "posthog-js/react"],
  },
});
