import webpack from 'webpack';
import path from 'path';

export default {
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '/client/index.js'),
  ],

  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
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
  devtool: 'source-map',
  target: 'web',
  stats: 'errors-only',
  devServer: {
    proxy: {
      '/api': 'http://localhost:8080'
    },
    compress: true,
    historyApiFallback: true,
    https: false,
    noInfo: true,
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
