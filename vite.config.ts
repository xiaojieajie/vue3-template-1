import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Markdown from 'vite-plugin-md'
import ViteImages from 'vite-plugin-vue-images'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

const pathResolve = (src: string) => resolve(__dirname, src)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({ script: { refSugar: true }, include: [/\.vue$/, /\.md$/] }),
    Unocss(),
    Pages({ extensions: ['vue', 'md'] }),
    Layouts(),
    AutoImport({
      imports: ['vue', 'pinia', 'vue-router', '@vueuse/core', { axios: [['default', 'axios']] }],
      dts: 'src/auto-imports.d.ts'
    }),
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts'
    }),
    Markdown(),
    ViteImages(),
    VueSetupExtend()
  ],
  resolve: {
    alias: {
      '@': pathResolve('src'),
      '@a': pathResolve('src/assets'),
      '@s': pathResolve('src/modules/pinia')
    }
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/core']
  }
})
