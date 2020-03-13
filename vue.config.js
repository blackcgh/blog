module.exports = {
  devServer: {
    port: 8081,
  },
  configureWebpack: {
    resolve: {
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
