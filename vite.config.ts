import { type ConfigEnv, type UserConfigExport, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgLoader from 'vite-svg-loader'
import UnoCSS from 'unocss/vite'
import path, { resolve } from 'path'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_PUBLIC_PATH } = env
  return {
    base: VITE_PUBLIC_PATH,
    plugins: [
      vue(),
      VueDevTools(),
      vueJsx(),
      /** 将 SVG 静态图转化为 Vue 组件 */
      svgLoader({ defaultImport: 'url' }),
      /** SVG */
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        symbolId: 'icon-[dir]-[name]'
      }),
      /** UnoCSS */
      UnoCSS()
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: ''
        }
      }
    },
    server: {
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true, // host: "0.0.0.0"
      /** 端口号 */
      port: 8080,
      /** 是否自动打开浏览器 */
      open: false,
      /** 跨域设置允许 */
      cors: true,
      /** 端口被占用时，是否直接退出 */
      strictPort: false,
      /** 接口代理 */
      proxy: {
        '/api/': {
          target: '',
          ws: true,
          /** 是否允许跨域 */
          changeOrigin: true
        }
      },
      /** 预热常用文件，提高初始页面加载速度 */
      warmup: {
        clientFiles: ['./src/layout/**/*.vue']
      }
    },
    build: {
      /** 单个 chunk 文件的大小超过 2048KB 时发出警告 */
      chunkSizeWarningLimit: 2048,
      /** 禁用 gzip 压缩大小报告 */
      reportCompressedSize: false,
      /** 打包后静态资源目录 */
      assetsDir: 'static',
      rollupOptions: {
        output: {
          /**
           * 分块策略
           * 1. 注意这些包名必须存在，否则打包会报错
           * 2. 如果你不想自定义 chunk 分割策略，可以直接移除这段配置
           */
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            element: ['element-plus', '@element-plus/icons-vue']
          }
        }
      }
    },
    /** 混淆器 */
    esbuild:
      mode === 'development'
        ? undefined
        : {
            /** 打包时移除 console.log */
            pure: ['console.log'],
            /** 打包时移除 debugger */
            drop: ['debugger'],
            /** 打包时移除所有注释 */
            legalComments: 'none'
          },
    test: {
      include: ['tests/**/*.test.ts'],
      environment: 'jsdom'
    }
  }
}
