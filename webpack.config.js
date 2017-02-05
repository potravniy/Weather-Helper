var webpack = require('webpack')
var path = require('path')

module.exports = {
  devtool: '#eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      _actions: 'src/redux/actions',
      _components: 'src/components',
      _constants: 'src/constants',
      _containers: 'src/containers',
      _icons: 'src/components/icons',
      _intl: 'src/intl',
      _listeners: 'src/redux/listeners',
      _redux: 'src/redux',
      _reducers: 'src/redux/reducers',
      _utils: 'src/utils'
    },
    extensions: ['', '.json', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js$/, loaders: ['babel'], exclude: /node_modules/, include: __dirname
      },
      {
        test: /\.json$/, loader: "json-loader", include: __dirname
      }
    ]
  }
}
