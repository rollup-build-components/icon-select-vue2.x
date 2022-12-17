# 用 Rollup 打包 Vue2.x UI 组件

<br/>
<br/>


## Rollup 打包所涉及的处理

1. Rollup 打包 Vue2.x 组件 所需依赖
2. Rollup 打包 Vue2.x 组件 插件选项
3. Rollup 打包 Script 脚本 运行配置


<br/>
<br/>


## 1. Rollup 打包 Vue2.x 所需依赖 (详见 [package.json](https://github.com/rollup-build-components/vue-icon-select-2.x/blob/main/package.json))

- `@rollup/plugin-alias`

    - 用途: rollup 路径别名配置

<br/>

- `@rollup/plugin-babel`

    - 用途: rollup babel plugin

    - 配置: babel.config.js
      ```javascript
        module.exports = {
          presets: [
            '@vue/babel-preset-jsx'
          ]
        }
      ```

    - 依赖:
        - `@babel/core` babel 核心
        - `@vue/babel-preset-jsx` babel 处理 Vue2.x jsx 语法
        - `@vue/babel-helper-vue-jsx-merge-props` babel 处理 Vue jsx props

<br/>

- `@rollup/plugin-node-resolve`

    - 用途: 用于解析 node_modules 中第三方模块

<br/>

- `rollup-plugin-vue`

    - 用途: 解析 Vue SFC (Single File Component)
    - 版本: Vue2.x时, version = ^5.1.9
    - 依赖:
      - `vue` version = ^2.7.14
      - `less` version = ^3.0.4
      - `less-loader` version = ^5.0.0",
      - `vue-template-compiler` version = ^2.7.14

<br/>

- rollup-plugin-postcss

    - 用途: 用于处理 css 样式, 包括 Vue 单文件中 `<style>` 样式


<br/>
<br/>


## 2. Rollup 打包 Vue2.x 组件 插件选项

  ```javascript

    const { defineConfig } = require('rollup')
    const { nodeResolve } = require('@rollup/plugin-node-resolve')
    const postcss = require('rollup-plugin-postcss')
    const babel = require('@rollup/plugin-babel')
    const alias = require('@rollup/plugin-alias')
    const vue = require('rollup-plugin-vue')
    const path = require('path')

    /**
     * Rollup Configuration, 建议使用 defineConfig 以支持TS识别
     */
    module.exports = defineConfig([
      {
        input: 'src/index.vue',
        output: [
          {
            // import 'xxx'
            dir: 'dist',
            format: 'es',
            entryFileNames: chunk => `[name].mjs`
          },
          {
            // require('xxx')
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
              replacement: path.resolve(__dirname, './src')
            }]
          }),
          vue(),
          postcss(),
          babel({                       // 指定 babel 处理文件类型
            babelHelpers: 'bundled',    // 如果 vue 存在 jsx 语法，
            extensions: ['.js', '.vue'] // 则会从 babel.config.js, 调用 @vue/babel-preset-jsx 处理
          })
        ],

        // 排除不需要混入代码中的第三方依赖
        external: [
          /^vue(\/.+|$)/, // 也可以字符串 'vue'
          /^ant-design-vue(\/.+|$)/ // 也可以字符串 'ant-design-vue'
        ]
      }
    ])
  ```


<br/>
<br/>


## 3. Rollup 打包 Script 脚本 运行配置

  ```json
    {
      "scripts": {
        "build": "shx rm -rf dist && rollup -c"
      }
    }
  ```


<br/>
<br/>


# 许可证
> MIT
