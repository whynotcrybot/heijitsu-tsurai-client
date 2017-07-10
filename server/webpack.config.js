const path = require('path')
const nodeExternals = require('webpack-node-externals')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
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
    new UglifyJSPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    }),
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
