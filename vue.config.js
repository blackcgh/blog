module.exports = {
  configureWebpack: {
    resolve: {
      // 别名
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'network': '@/network',
        'common': '@/common',
        'views': '@/views'
      }
    }
  },
  devServer: {
    // 挂载端口
    port: 80,
    // 跨域代理
    proxy: {
      // 数据请求
      '/api': {
        target: 'http://localhost:8080/api',
        changOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      // 图片请求
      '/images': {
        target: 'http://localhost:8080/images',
        changOrigin: true,
        ws: true,
        pathRewrite: {
          '^/images': ''
        }
      }
    }
  }
}
