import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    watch: {
      usePolling: true,
    },
    allowedHosts: ["frontend"],
    hmr: {
      host: "localhost",
      port: 3000,
    },
    proxy: {
      "/api": {
        target: "http://backend:8000",
        changeOrigin: true,
        rewrite: function (path: string): string {
          return path.replace(/^\/api/, "");
        },
      },
    },
  },
});
