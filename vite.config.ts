import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  optimizeDeps: {
    include: ["@react-three/drei", "@react-three/fiber", "three"],
  },
  server: {
    fs: {
      strict: false,
    },
  },
});
