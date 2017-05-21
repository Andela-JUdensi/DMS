// import webpack from 'webpack';
// import path from 'path';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    // 'eventsource-polyfill',
    'webpack-hot-middleware/client?reaload=true',
    path.join(__dirname, '/client/index'),
  ],

  output: {
    // path: path.resolve(__dirname, ''),
    publicPath: '/',
    sourceMapFilename: 'source.map',
    filename: 'main.js'
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
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.scss', '.pug', '.html'],
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
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ],
  node: {
    net: 'empty',
    dns: 'empty',
  },
};
