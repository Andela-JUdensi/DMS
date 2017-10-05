import path from 'path';
import webpack from 'webpack';
import webpackMiddleWare from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import app from './server';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const isDeveloping = process.env.NODE_ENV !== 'production';

if (isDeveloping) {
  const webpackConfig = require('../webpack.config.dev'); // eslint-disable-line
  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleWare(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
  }));
  app.use(webpackHotMiddleware(compiler));
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });
} else {
  app.use(require('express').static('lib/client')); // eslint-disable-line
}

