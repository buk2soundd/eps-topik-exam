import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/eps-topik-exam/' : '/',
  plugins: [react(), tailwindcss(), cloudflare()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
})