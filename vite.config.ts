import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "primary-color": "#475DE5",
          "table-header-bg": "transparent",
          "table-row-hover-bg": "#f7fafc",
          "table-selected-row-bg": "#f7fafc",
        },
        javascriptEnabled: true,
      },
    },
  },
});
