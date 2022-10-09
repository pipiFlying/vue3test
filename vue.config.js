const { defineConfig } = require('@vue/cli-service');
// 添加path,require等模块引入使用
const NodePolyfillWebpackPlugin = require('node-polyfill-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    externals: {
      electron: 'require("electron")'
    },
    plugins: [new NodePolyfillWebpackPlugin()]
  }
});
