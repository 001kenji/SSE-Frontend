// import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from "vite";
export default defineConfig({
  build: { manifest: true },
  base: process.env.mode === "production" ? "/static/" : "/",
  root: "./",
  plugins: [react()],
});
