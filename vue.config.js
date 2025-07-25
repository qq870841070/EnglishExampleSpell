const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './', // 设置为相对路径
  outputDir: 'my-build', // 指定输出目录
  assetsDir: 'static', // 指定静态资源目录
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map' // 开发环境使用 source-map
  },
})
