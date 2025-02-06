import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import replace from "@rollup/plugin-replace";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    replace({
      preventAssignment: true,
      "process.env.BUILD_HASH": JSON.stringify(Date.now()),
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        serviceWorker: "src/service-worker.js",
      },
      output: {
        entryFileNames: (chunkInfo) =>
          chunkInfo.name == "serviceWorker"
            ? "sw.js"
            : "assets/[name]-[hash].js",
      },
    },
  },
});
