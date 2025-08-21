import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tailwindcss from '@tailwindcss/vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    reporters: ["default"],
    coverage: {
      provider: "istanbul",
      exclude: [
        "src/main.tsx",
        ".eslintrc.cjs",
        "vite.config.ts",
        "tsconfig.json",
      ],
    },
  },
});
