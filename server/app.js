import path from 'path';
import favicon from 'serve-favicon';
import webpack from 'webpack';
import webpackMiddleWare from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import server from './server';

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'pug');

const isDeveloping = process.env.NODE_ENV !== 'production';

if (isDeveloping) {
  const webpackConfig = require('../webpack.config.prod');
  const compiler = webpack(webpackConfig);
  const webpackMiddleware = webpackMiddleWare(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  server.use(webpackMiddleware);
  server.use(webpackHotMiddleware(compiler));
  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
    res.end();
  });
} else {
  server.use(require('express').static('lib/client'));
  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
  });
}

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// app.get('/', (req, res) => {
//   res.render('index', {
//     title: 'Hermes | Document Management System'
//   });
// });
