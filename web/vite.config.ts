import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const REPO_BASE_PATH = "/termometro/";

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": "/src" },
  },
  base: command === "build" ? REPO_BASE_PATH : "/",
  server: { port: 5173 },
}));
