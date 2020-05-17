const { createProxyMiddleware: proxy } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy('/txapi/ncov', {
      target: 'http://api.tianapi.com',
      changeOrigin: true
    })
  )
  app.use(
    proxy('/huanent/vue-echarts-map-demo/master/map', {
      target: 'https://raw.githubusercontent.com',
      changeOrigin: true
    })
  )
}
