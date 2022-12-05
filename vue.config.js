const { defineConfig } = require('@vue/cli-service');
const path = require('path');
// 添加path,require等模块引入使用
const NodePolyfillWebpackPlugin = require('node-polyfill-webpack-plugin');
// 引入包分析器
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// 引入开启GZIP插件
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// 生产环境标志位
const isPro = process.env.NODE;
const productionGzipExtensions = ['js', 'css'];

module.exports = defineConfig({
  transpileDependencies: true,
  /* 生产环境关闭map文件生成 */
  productionSourceMap: false,
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      host: 'localhost',
      port: 8089,
      hot: true,
      proxy: {
        '/api': {
          // target配置不能为空, 否则运行报错
          // 此外还要注意http和https的区别
          target: 'http://localhost:3000/api',
          // target: 'https://dev-onehome.andnext.cn:8740/api',
          changeOrigin: true,
          ws: false,
          pathRewrite: { '^/api': '' }
        },
        '/uaa': {
          // target配置不能为空, 否则运行报错
          // 此外还要注意http和https的区别
          target: 'http://localhost:3000/uaa',
          // target: 'https://dev-onehome.andnext.cn:8740/api',
          changeOrigin: true,
          ws: false,
          pathRewrite: { '^/uaa': '' }
        },
        '/os': {
          // target配置不能为空, 否则运行报错
          target: 'https://gw.alipayobjects.com/os',
          changeOrigin: true,
          ws: false,
          pathRewrite: { '^/os': '' }
        }
      }
    },
    externals: {
      electron: 'require("electron")'
    },
    plugins: [
      new NodePolyfillWebpackPlugin(),
      new BundleAnalyzerPlugin(),
      isPro &&
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        }),
      isPro &&
        new CompressionWebpackPlugin({
          test: /\.(js|css)(\?.*)?$/i,
          threshold: 10240,
          deleteOriginalAssets: false
        })
    ],
    resolve: {
      alias: {
        '@routes': path.resolve(__dirname, 'src/router/index.ts'),
        '/static': path.resolve(__dirname, '/public/local.json')
      }
    }
  }
});
