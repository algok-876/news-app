module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://study.yuanjin.tech',
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
      config.set('externals', {
        vue: 'Vue',
        axios: 'axios',
        'vue-router': 'VueRouter',
        vuex: 'Vuex'
      })
      config.module.rule('img')
        .test(/\.(jpg|png|gif)$/)
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          bypassOnDebug: true
        })
        .end()
    }

    if (process.env.NODE_ENV === 'development') {
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    }
  }
}
