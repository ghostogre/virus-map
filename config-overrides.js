const { override, fixBabelImports } = require('customize-cra')
const CompressWebpackPlugin = require('compression-webpack-plugin')

const addCustomize = () => (config) => {
  if (process.env.NODE_ENV === 'production') {
    config.devtool = false // 关闭sourceMap
    config.plugins.push(
      new CompressWebpackPlugin({
        test: /\.js$|\.css$/,
        threshold: 1024
      })
    )
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
