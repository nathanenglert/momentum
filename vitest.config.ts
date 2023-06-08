import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: [
      "**/__tests__/**/*.?(c|m)[jt]s?(x)",
      "**/components/**/*.tests.?(c|m)[jt]s?(x)",
      "**/?(*.){test,spec}.?(c|m)[jt]s?(x)",
    ],
  },
  resolve: {
    alias: {
      "@": __dirname,
    },
  },
})
