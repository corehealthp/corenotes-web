import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'


// https://vitejs.dev/config/
export default ({mode})=> {
  
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [react(), svgr()],
    server: {
      port: 3100,
      proxy: {
        "/api": {
          target: "http://localhost:3201",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        src: '/src',
      }
    },
    define: {
      'process.env': env
    }
  })
}
