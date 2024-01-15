import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    base: env.VITE_REACT_APP_BASE || "/AdvancedWebFinalProject/",
    optimizeDeps: {
      exclude: ["js-big-decimal"],
    },
  };
});
