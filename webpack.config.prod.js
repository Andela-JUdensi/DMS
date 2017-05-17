import webpack from 'webpack';
import path from 'path';

export default {
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '/client/index.js'),
  ],

  output: {
    // path: path.resolve(__dirname),
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'), // string
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'client')
        ],
        exclude: /node_modules/,
        loader: ['react-hot-loader', 'babel-loader'],
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
  devtool: 'source-map', // enum
  target: 'web', // enum
  // externals: ['react'],
  stats: 'errors-only',
  devServer: {
    proxy: {
      '/api': 'http://localhost:8080'
    },
    // contentBase: path.join(__dirname, 'client'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    // hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
      },
      comments: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],
  node: {
    net: 'empty',
    dns: 'empty',
  },
};
