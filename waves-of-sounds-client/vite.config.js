// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 8081,
//     host: "0.0.0.0",
//   },
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    server: {
        port: 8081,
        host: "0.0.0.0",
        proxy: {
            "/user": {
                target: "http://localhost:4001",
                changeOrigin: true,
            },
            "/artists": {
                target: "http://localhost:4001",
                changeOrigin: true,
            },
            "/stages": {
                target: "http://localhost:4001",
                changeOrigin: true,
            },
            "/dates": {
                target: "http://localhost:4001",
                changeOrigin: true,
            },
            "/genres": {
                target: "http://localhost:4001",
                changeOrigin: true,
            },
            "/articles": {
                target: "http://localhost:4001",
                changeOrigin: true,
            },
            "/newsletter": {
                target: "http://localhost:4001",
                changeOrigin: true,
            },
            "/departments": {
                target: "http://localhost:4001",
                changeOrigin: true,
            },
            "/volunteers": {
                target: "http://localhost:4001",
                changeOrigin: true,
            }
        }
    },
});
