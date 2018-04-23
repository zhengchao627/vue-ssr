const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('../webpack.config')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.join(__dirname, '..');

// const del = require('del');

// //打包前删除打包目录
// del.sync([`${__dirname}/dist`]);

module.exports = merge(baseConfig, {
  entry: rootPath + '/src/webapp/entry-client.js',
  plugins: [
    // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
    // 以便可以在之后正确注入异步 chunk。
    // 这也为你的 应用程序/vendor 代码提供了更好的缓存。
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/webapp/index.html',
      inject: false
  })
  ]
})