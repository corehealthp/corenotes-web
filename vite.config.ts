import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'


// https://vitejs.dev/config/
export default ({mode})=> {
  
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    base: '/',
    plugins: [react(), svgr()],
    server: {
      port: 3100,
      // proxy: {
      //   "/api": {
      //     target: "http://localhost:3200",
      //     changeOrigin: true,
      //     secure: false,
      //   },
      // },
      // port: 3100,
      // https: true,
      // hmr: {
      //     host: "34.197.199.182",
      //     port: 3200,
      //     protocol: "wss",
      // },
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
