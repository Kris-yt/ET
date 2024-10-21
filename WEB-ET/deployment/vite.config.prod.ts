/*
 * @Date: 2024-07-23 16:35:17
 * @FilePath: /AS-WEB-3.5/deployment/vite.config.prod.ts
 * @Description:
 */
import path from 'path';
import { defineConfig } from 'vite'
import commonjs from 'vite-plugin-commonjs';
import { createHtmlPlugin } from 'vite-plugin-html';
import { imagetools } from 'vite-imagetools'
import inject from '@rollup/plugin-inject';
import react from '@vitejs/plugin-react'

const __dirname = path.resolve();

export default defineConfig({
  base: '/webx',
  plugins: [
    commonjs(),
    react(),
    imagetools({}),
    inject({
      Logger: path.resolve(__dirname, 'src/core/utlis/logger'),
      GlobalVar: path.resolve(__dirname, 'src/core/constants/global'),
      Store: path.resolve(__dirname, 'src/core/services/cache'),
      $t: path.resolve(__dirname, 'src/core/services/i18n'),
      $T: path.resolve(__dirname, 'src/core/services/i18n/$T'),
      Emitter: path.resolve(__dirname, 'src/core/services/event-mitt'),
    }),
    createHtmlPlugin({
      inject: {
        data: {
          title: 'Legend Link',
          buildTime: new Date().toLocaleString(),
          favicon: '/webx/favicon_ll.ico',
        },
      },
    }),
  ],
  define: {
    __DEV__: false,
  },
  build: {
    emptyOutDir: true,
    sourcemap: false,
    assetsDir: 'plk',
    minify: 'terser',
    outDir: 'dist/',
    rollupOptions: {
      input: path.resolve(__dirname, './index.html'),
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@base-ui': path.resolve(__dirname, 'src/core/templates/base-ui'),
      '@my': path.resolve(__dirname, 'src/views/pl'),
      '@this': path.resolve(__dirname, 'src/views/pl/mobile-horizontal'),
      '@shadow': path.resolve(__dirname, 'src/views/pl/mobile-horizontal/shadow'),
      '@templates': path.resolve(__dirname, 'src/core/templates/mobile-horizontal'),
      '@actions': path.resolve(__dirname, 'src/core/actions'),
      '@services': path.resolve(__dirname, 'src/core/services'),
      '@constants': path.resolve(__dirname, 'src/core/constants'),
      '@locales': path.resolve(__dirname, 'src/locales'),
      '@utlis': path.resolve(__dirname, 'src/core/utlis'),
      '@apis': path.resolve(__dirname, 'src/core/apis'),
      '@hooks': path.resolve(__dirname, 'src/core/hooks'),
    },
  },
  css: {
    postcss: path.resolve(__dirname, 'postcss.config.cjs'),
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@this/style/mixin.scss" as *;`
    }
    },
    modules: {
      scopeBehaviour: 'local',
    },
  }
})
