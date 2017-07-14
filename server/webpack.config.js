const path = require('path')
const nodeExternals = require('webpack-node-externals')

const BabiliPlugin = require('babili-webpack-plugin')
const StatsPlugin = require('stats-webpack-plugin')

module.exports = {
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
  plugins: [
    new BabiliPlugin(),
    new StatsPlugin('stats.json', {
      chunkModules: true,
      exclude: /node_modules/
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
}
