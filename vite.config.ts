import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/ai-creative-studio/',
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      ignored: ['**/public/videos/**'],
    },
  },
});
