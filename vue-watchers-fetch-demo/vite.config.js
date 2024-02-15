import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: {
    "process.env": {},
  },
  build: {
    lib: {
      entry: "src/web-component.js",
      name: "GithubUserRepos",
      formats: ["es"],
      fileName: (format) => `github-user-repos.${format}.js`,
    },
    rollupOptions: {
      //  we need to include vue in the bundle
    },
  },
});
