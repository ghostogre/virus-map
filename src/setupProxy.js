const { createProxyMiddleware: proxy } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy('/txapi/ncov', {
      target: 'http://api.tianapi.com',
      changeOrigin: true
    })
  )
}
