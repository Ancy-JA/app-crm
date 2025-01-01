import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths({ root: __dirname }), react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          antd: ["antd"],
        },
      },
    },
  },
  server: {
    proxy: {
      "/graphql": {
        target: "https://vineoback-gh-qa.caprover2.innogenio.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/graphql/, "/graphql"),
      },
    },
  },
});
