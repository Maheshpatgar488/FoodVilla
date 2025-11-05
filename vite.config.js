import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    fs: {
      strict: false,
    },
    // ✅ Add this to fix React Router refresh crash
    historyApiFallback: true,
  },
  preview: {
    port: 4173,
    open: true,
  },
});
