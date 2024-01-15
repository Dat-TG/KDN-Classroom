import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

process.env = { ...process.env, ...loadEnv("all", process.cwd()) };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_REACT_APP_BASE || "/AdvancedWebFinalProject/",
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
});
