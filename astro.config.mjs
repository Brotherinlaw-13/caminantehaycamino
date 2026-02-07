import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://caminantehaycamino.vercel.app',
  output: 'static',
  build: {
    format: 'directory'
  }
});
