const { defineConfig } = require('rollup')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const postcss = require('rollup-plugin-postcss')
const babel = require('@rollup/plugin-babel')
const alias = require('@rollup/plugin-alias')
const vue = require('rollup-plugin-vue')

/**
 * Rollup Configuration
 */
export default defineConfig([
  {
    input: 'src/index.vue',
    output: [
      {
        dir: 'dist',
        format: 'es',
        entryFileNames: chunk => `[name].mjs`
      },
      {
        dir: 'dist',
        format: 'cjs',
        exports: 'named',
        entryFileNames: chunk => `[name].cjs`
      }
    ],
    plugins: [
      nodeResolve(),
      alias({
        entries: [{
          find: '@',
          replacement: new URL('./src', import.meta.url).pathname
        }]
      }),
      vue(),
      postcss(),
      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.vue']
      })
    ],
    external: [
      /^vue(\/.+|$)/,
      /^ant-design-vue(\/.+|$)/
    ]
  }
])
