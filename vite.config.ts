import { coverageConfigDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/simplifica",
  test: {
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "src/main.jsx",
        "src/App.jsx",
        ...coverageConfigDefaults.exclude,
      ],
    },
    globals: true,
  },
});
