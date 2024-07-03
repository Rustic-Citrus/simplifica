import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/simplifica-frontend/",
  test: {
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"],
    },
    globals: true,
  },
  setupFiles: "./tests/setup.js",
});
