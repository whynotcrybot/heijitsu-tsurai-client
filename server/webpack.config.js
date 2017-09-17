const path = require('path')
const nodeExternals = require('webpack-node-externals')

const WebpackSourceMapSupport = require('webpack-source-map-support')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const StatsPlugin = require('stats-webpack-plugin')
const WebpackMessages = require('webpack-messages')

module.exports = {
  devtool: 'source-map',
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    'index': './source/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2'
  },
  stats: false,
  plugins: [
    new WebpackSourceMapSupport(),
    new MinifyPlugin(),
    new StatsPlugin('stats.json', {
      chunkModules: true,
      exclude: /node_modules/
    }),
    new WebpackMessages({
      name: 'server',
      logger: str => console.log(`>> ${str}`)
    })
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
}
