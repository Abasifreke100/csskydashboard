// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     sourcemap: true, // Enable source maps
//     // You can also configure other build options here
//     // For example, output directory, minification, etc.
//   },
//   server: {
//     port: 3000, 
//   },
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
