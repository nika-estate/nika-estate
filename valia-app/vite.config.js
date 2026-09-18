import { defineConfig } from 'vite';
import { resolve } from 'node:path';
export default defineConfig({base:'./',build:{outDir:'dist/client',rollupOptions:{input:{ru:resolve('index.html'),en:resolve('en/index.html')}}}});
