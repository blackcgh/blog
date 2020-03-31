module.exports = {
  devServer: {
    port: 8081,
  },
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
  }
}
