import path from 'path';
import favicon from 'serve-favicon';
import webpack from 'webpack';
import webpackMiddleWare from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import app from './server';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const isDeveloping = process.env.NODE_ENV !== 'production';

if (isDeveloping) {
  const webpackConfig = require('../webpack.config.dev');
  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleWare(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
  }));
  app.use(webpackHotMiddleware(compiler));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });
} else {
  app.use(require('express').static('lib/client'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
  });
}

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// app.get('/', (req, res) => {
//   res.render('index', {
//     title: 'Hermes | Document Management System'
//   });
// });
