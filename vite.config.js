import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      constants: path.resolve(__dirname, 'src/constants'),
    },
  },
  build: {
    outDir: 'dist',
  },
});