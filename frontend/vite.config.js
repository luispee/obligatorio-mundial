import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    allowedHosts: true,
    proxy: {
      // Cada vez que en tu código hagas fetch('/api/usuarios'),
      // Vite lo redirigirá al contenedor del backend internamente.
      '/api': {
        target: 'http://backend:5001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
