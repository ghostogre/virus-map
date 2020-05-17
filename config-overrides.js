const { override, fixBabelImports } = require('customize-cra')
// 压缩
const CompressWebpackPlugin = require('compression-webpack-plugin')
// 使用 Day.js 替换 momentjs 优化打包大小
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')

const addCustomize = () => (config) => {
  if (process.env.NODE_ENV === 'production') {
    config.devtool = false // 关闭sourceMap
    config.plugins.push(
      new CompressWebpackPlugin({
        test: /\.js$|\.css$/,
        threshold: 1024
      })
    )
    config.plugins.push(AntdDayjsWebpackPlugin())
  }
  return config
}

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css'
    }),
    addCustomize()
  )
}
