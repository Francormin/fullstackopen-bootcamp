import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./", // importante para rutas relativas
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js"
  },
  server: {
    host: true,
    watch: {
      usePolling: true,
      interval: 100
    },
    allowedHosts: ["app"]
  }
});
