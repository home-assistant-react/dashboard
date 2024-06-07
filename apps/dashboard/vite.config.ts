import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { viteRefresh } from "./vite-refresh";

console.log("THIS IS PRODUCTION", process.env.ENV);

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.ENV === "production" ? "[[**|DASHBOARD_BASE_URL|**]]" : "",
  build: {
    rollupOptions: {
      output: {
        format: "iife",
      },
    },
  },
  plugins: [
    react(),
    viteRefresh(),
    // TODO THIS NEED TO BE ENABLED FOR PRODUCTION BUILD - FOR SOME REASON LEAVING IT IN DEVELOPMENT BREAKS THE HRM
    /*createExternal({
      interop: "auto",
      externals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
      development: {
        externals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    }),*/
  ],
});
