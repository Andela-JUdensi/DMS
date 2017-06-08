import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mJson from 'morgan-json';
import winston from 'winston';
import routes from './routes';
import swagger from './routes/swagger';
import { SERVER } from './configs';
import * as middlewares from './middlewares/';

const app = express();
const router = express.Router();
const format = mJson(':method :url :status :res[content-length] bytes :response-time ms');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use([middlewares.verifyAuthentication,
  middlewares.verifyRouteAndMethod]);
app.use(morgan(format));

if (process.env.NODE_ENV !== 'production') {
  app.use('/documentation', express.static(path.join(__dirname, './swagger/')));
} else {
  app.use('/documentation', express.static(
    path.join(__dirname, '../../server/swagger/')));
}

routes(router);
swagger(router);

app.use('/api', router);

app.listen(SERVER.PORT, () =>
  winston.info(`Hermes is Awakened ON PORT ${SERVER.PORT}`));

export default app;
