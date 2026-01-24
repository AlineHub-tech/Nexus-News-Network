// vite.config.js (cyangwa .ts)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  // Ongeramo iki gice cyose kugira ngo ushiremo modules
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  // Iyi ni Alternative niba iriya yo hejuru yanze
  // build: {
  //   rollupOptions: {
  //     external: ['axios'], 
  //   },
  // },
});
