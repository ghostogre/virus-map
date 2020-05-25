const { override, fixBabelImports } = require('customize-cra')
// 压缩
const CompressWebpackPlugin = require('compression-webpack-plugin')
// 使用 Day.js 替换 momentjs 优化打包大小
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const addCustomize = () => (config) => {
  if (process.env.NODE_ENV === 'production') {
    config.devtool = false // 关闭sourceMap
    config.plugins.push(
      new CompressWebpackPlugin({
        test: /\.js$|\.css$/,
        threshold: 1024
      })
    )
    config.plugins.push(
      new BundleAnalyzerPlugin({
        //  可以是`server`，`static`或`disabled`。
        //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
        //  在“静态”模式下，会生成带有报告的单个HTML文件。
        //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8889,
        //  路径捆绑，将在`static`模式下生成的报告文件。
        reportFilename: 'report.html',
        //  模块大小默认显示在报告中。
        defaultSizes: 'parsed',
        //  在默认浏览器中自动打开报告
        openAnalyzer: true,
        //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null,
        logLevel: 'info' // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
      })
    )
    config.plugins.push(new AntdDayjsWebpackPlugin())
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
