// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'axios': 'axios/dist/axios.min.js', // Ibi bihatira Vite gukoresha file nyayo
    },
  },
});
