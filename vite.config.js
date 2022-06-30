import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const { PORT = 3001 } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "babel-plugin-styled-components",
            {
              meaninglessFileNames: ["index", "styles"]
            }
          ]
        ]
      }
    })
  ],
  server: {
    proxy: {
      "/api": {
        target: `http://localhost:${PORT}`,
        changeOrigin: true
        //rewrite: (path) => path.replace(/^\/api/, '')
      },
      "/ws": {
        target: `ws://localhost:${PORT}`,
        ws: true
      }
    }
  }
});
