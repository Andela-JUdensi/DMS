import 'babel-polyfill';
import express from 'express';
import morgan from 'morgan';
import mJson from 'morgan-json';
import winston from 'winston';
import path from 'path';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackMiddleWare from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import routes from './routes';
import { SERVER } from './configs/configs';
import webpackConfig from '../webpack.config.dev';
import middleware from './configs/middlewares/';

const compiler = webpack(webpackConfig);
const app = express();
const router = express.Router();
const format = mJson(':method :url :status :res[content-length] bytes :response-time ms');

routes(router);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

if (process.env.NODE_ENV !== 'production') {
  app.use(webpackMiddleWare(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
  }));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use('/', express.static(path.join(__dirname)));
}
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan(format));
app.use([middleware.verifyAuthentication, middleware.verifyRouteAndMethod]);
app.use('/api', router);

app.get('*', (req, res) => {
  res.render('index', {
    title: 'Hermes | Document Management System'
  });
});

app.listen(SERVER.PORT, () => winston.info(`Hermes is Awakened ON PORT ${SERVER.PORT}`));

export default app;
