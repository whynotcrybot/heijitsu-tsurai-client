const postcssPlugins = [
  require('postcss-modules-local-by-default'),
  require('postcss-import'),
  require('postcss-cssnext'),
  require('postcss-nested')
]

export default {
  test: /\.(scss)$/,
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        modules: true,
        importLoaders: 2,
        localIdentName: '[local]--[hash:base64:5]',
        camelCase: true
      }
    },
    {
      loader: 'sass-loader'
    }
  ],
  exclude: /node_modules/
}

