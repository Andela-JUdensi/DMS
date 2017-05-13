import webpack from 'webpack';
import path from 'path';

export default {
  entry: [
    // 'eventsource-polyfill',
    'webpack-hot-middleware/client?reaload=true',
    path.join(__dirname, '/client/index'),
  ],

  output: {
    path: path.resolve(__dirname),
    publicPath: '/',
    sourceMapFilename: 'source.map',
    // path: path.resolve(__dirname, 'dist'), // string
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'client')
        ],
        exclude: /node_modules/,
        use: ['react-hot-loader', 'babel-loader'],
      },
      {
        test: /\.scss?$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
  devtool: 'cheap-module-eval-source-map', // enum
  target: 'web', // enum
  // externals: ['react'],
  stats: 'errors-only',
  devServer: {
    proxy: {
      '/api': 'http://localhost:8080'
    },
    contentBase: path.join(__dirname), // boolean | string | array, static file location
    // compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: false, // only errors & warns on hot reload
    stats: 'minimal',
    publicPath: '/',
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
  ],
  node: {
    net: 'empty',
    dns: 'empty',
  },
};
